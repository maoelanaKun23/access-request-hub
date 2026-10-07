using System.Net;
using System.Net.Http.Json;
using AccessRequestHub.Api.Data;
using AccessRequestHub.Api.Dtos;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AccessRequestHub.Tests.IntegrationTests;

public class AccessRequestFlowTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public AccessRequestFlowTests(WebApplicationFactory<Program> factory)
    {
        // Setup an in-memory database or a separate test sqlite db for each run
        _factory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
                if (descriptor != null) services.Remove(descriptor);

                services.AddDbContext<AppDbContext>(options =>
                {
                    options.UseSqlite("DataSource=file::memory:?cache=shared");
                });

                var sp = services.BuildServiceProvider();
                using var scope = sp.CreateScope();
                var scopedServices = scope.ServiceProvider;
                var db = scopedServices.GetRequiredService<AppDbContext>();
                db.Database.OpenConnection(); // Keep connection open for in-memory db
                db.Database.EnsureCreated();
                SeedData.Initialize(scopedServices);
            });
        });
    }

    private HttpClient CreateClientWithUser(string email)
    {
        var client = _factory.CreateClient();
        client.DefaultRequestHeaders.Add("X-User-Email", email);
        return client;
    }

    private async Task<int> GetApplicationId(string name)
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var app = await db.Applications.FirstAsync(a => a.Name == name);
        return app.Id;
    }

    [Fact]
    public async Task StandardFlow_Alice_CRM_NonProd_Read_ApprovedByBob()
    {
        var aliceClient = CreateClientWithUser("alice@example.local");
        var bobClient = CreateClientWithUser("bob@example.local");
        var crmId = await GetApplicationId("CRM");

        // 1. Create request
        var createDto = new CreateAccessRequestDto
        {
            ClientRequestId = Guid.NewGuid().ToString(),
            ApplicationId = crmId,
            Environment = "NonProduction",
            AccessLevel = "Read",
            Justification = "Need read access to CRM"
        };
        var createResponse = await aliceClient.PostAsJsonAsync("/api/access-requests", createDto);
        createResponse.EnsureSuccessStatusCode();
        var createdReq = await createResponse.Content.ReadFromJsonAsync<AccessRequestResponseDto>();
        Assert.NotNull(createdReq);
        Assert.Equal("WaitingForManager", createdReq.Status);

        // 2. Bob Approves
        var approveResponse = await bobClient.PostAsync($"/api/access-requests/{createdReq.Id}/approve", null);
        approveResponse.EnsureSuccessStatusCode();

        // 3. Verify final state
        var getResponse = await aliceClient.GetAsync($"/api/access-requests/{createdReq.Id}");
        getResponse.EnsureSuccessStatusCode();
        // Since we return { Request = dto, AuditTrail = ... } in the controller
        var content = await getResponse.Content.ReadAsStringAsync();
        Assert.Contains("\"status\":\"Approved\"", content);
    }

    [Fact]
    public async Task HighRiskFlow_Alice_CRM_Prod_Read_RequiresCarol()
    {
        var aliceClient = CreateClientWithUser("alice@example.local");
        var bobClient = CreateClientWithUser("bob@example.local");
        var carolClient = CreateClientWithUser("carol@example.local");
        var crmId = await GetApplicationId("CRM");

        // 1. Create
        var createDto = new CreateAccessRequestDto
        {
            ClientRequestId = Guid.NewGuid().ToString(),
            ApplicationId = crmId,
            Environment = "Production",
            AccessLevel = "Read",
            Justification = "Prod support"
        };
        var createResponse = await aliceClient.PostAsJsonAsync("/api/access-requests", createDto);
        var createdReq = await createResponse.Content.ReadFromJsonAsync<AccessRequestResponseDto>();
        Assert.NotNull(createdReq);

        // 2. Bob Approves -> goes to SystemOwner
        await bobClient.PostAsync($"/api/access-requests/{createdReq.Id}/approve", null);

        var getResponse = await aliceClient.GetAsync($"/api/access-requests/{createdReq.Id}");
        var content = await getResponse.Content.ReadAsStringAsync();
        Assert.Contains("\"status\":\"WaitingForSystemOwner\"", content);

        // 3. Carol Approves
        await carolClient.PostAsync($"/api/access-requests/{createdReq.Id}/approve", null);
        
        getResponse = await aliceClient.GetAsync($"/api/access-requests/{createdReq.Id}");
        content = await getResponse.Content.ReadAsStringAsync();
        Assert.Contains("\"status\":\"Approved\"", content);
    }

    [Fact]
    public async Task UnauthorizedApproval_CarolCannotApproveManagerStep()
    {
        var aliceClient = CreateClientWithUser("alice@example.local");
        var carolClient = CreateClientWithUser("carol@example.local");
        var crmId = await GetApplicationId("CRM");

        var createDto = new CreateAccessRequestDto
        {
            ClientRequestId = Guid.NewGuid().ToString(),
            ApplicationId = crmId,
            Environment = "Production",
            AccessLevel = "Read",
            Justification = "Prod support"
        };
        var createResponse = await aliceClient.PostAsJsonAsync("/api/access-requests", createDto);
        var createdReq = await createResponse.Content.ReadFromJsonAsync<AccessRequestResponseDto>();
        Assert.NotNull(createdReq);

        // Carol attempts to approve at manager step -> Forbidden (403 or 401 based on how it's handled in middleware, our code returns 403 Forbid)
        var approveResponse = await carolClient.PostAsync($"/api/access-requests/{createdReq.Id}/approve", null);
        Assert.Equal(HttpStatusCode.Forbidden, approveResponse.StatusCode);
    }

    [Fact]
    public async Task DuplicateClientRequestId_ShouldBeIdempotent()
    {
        var aliceClient = CreateClientWithUser("alice@example.local");
        var crmId = await GetApplicationId("CRM");
        var clientId = Guid.NewGuid().ToString();

        var createDto = new CreateAccessRequestDto
        {
            ClientRequestId = clientId,
            ApplicationId = crmId,
            Environment = "NonProduction",
            AccessLevel = "Read",
            Justification = "Idempotent test"
        };

        var resp1 = await aliceClient.PostAsJsonAsync("/api/access-requests", createDto);
        var req1 = await resp1.Content.ReadFromJsonAsync<AccessRequestResponseDto>();

        var resp2 = await aliceClient.PostAsJsonAsync("/api/access-requests", createDto);
        var req2 = await resp2.Content.ReadFromJsonAsync<AccessRequestResponseDto>();

        Assert.Equal(req1!.Id, req2!.Id);
    }

    [Fact]
    public async Task RejectionWithReason()
    {
        var aliceClient = CreateClientWithUser("alice@example.local");
        var bobClient = CreateClientWithUser("bob@example.local");
        var crmId = await GetApplicationId("CRM");

        var createDto = new CreateAccessRequestDto
        {
            ClientRequestId = Guid.NewGuid().ToString(),
            ApplicationId = crmId,
            Environment = "NonProduction",
            AccessLevel = "Read",
            Justification = "Test Rejection"
        };
        var resp = await aliceClient.PostAsJsonAsync("/api/access-requests", createDto);
        var req = await resp.Content.ReadFromJsonAsync<AccessRequestResponseDto>();

        var rejectDto = new RejectRequestDto { Reason = "Not needed" };
        var rejectResp = await bobClient.PostAsJsonAsync($"/api/access-requests/{req!.Id}/reject", rejectDto);
        rejectResp.EnsureSuccessStatusCode();

        var getResp = await aliceClient.GetAsync($"/api/access-requests/{req.Id}");
        var content = await getResp.Content.ReadAsStringAsync();
        Assert.Contains("\"status\":\"Rejected\"", content);
    }

    [Fact]
    public async Task AdminHighRiskFlow_Alice_Finance_NonProd_Admin_RequiresDana()
    {
        var aliceClient = CreateClientWithUser("alice@example.local");
        var bobClient = CreateClientWithUser("bob@example.local");
        var danaClient = CreateClientWithUser("dana@example.local");
        var financeId = await GetApplicationId("Finance Portal");

        var createDto = new CreateAccessRequestDto
        {
            ClientRequestId = Guid.NewGuid().ToString(),
            ApplicationId = financeId,
            Environment = "NonProduction",
            AccessLevel = "Admin",
            Justification = "Needs Admin access to non-prod for testing"
        };
        var createResponse = await aliceClient.PostAsJsonAsync("/api/access-requests", createDto);
        var createdReq = await createResponse.Content.ReadFromJsonAsync<AccessRequestResponseDto>();
        Assert.NotNull(createdReq);

        await bobClient.PostAsync($"/api/access-requests/{createdReq.Id}/approve", null);

        var getResponse = await aliceClient.GetAsync($"/api/access-requests/{createdReq.Id}");
        var content = await getResponse.Content.ReadAsStringAsync();
        Assert.Contains("\"status\":\"WaitingForSystemOwner\"", content);

        await danaClient.PostAsync($"/api/access-requests/{createdReq.Id}/approve", null);
        
        getResponse = await aliceClient.GetAsync($"/api/access-requests/{createdReq.Id}");
        content = await getResponse.Content.ReadAsStringAsync();
        Assert.Contains("\"status\":\"Approved\"", content);
    }

    [Fact]
    public async Task ConcurrentDuplicateCreate_ShouldCreateOnlyOneRow()
    {
        var aliceClient = CreateClientWithUser("alice@example.local");
        var crmId = await GetApplicationId("CRM");
        var clientId = Guid.NewGuid().ToString();

        var createDto = new CreateAccessRequestDto
        {
            ClientRequestId = clientId,
            ApplicationId = crmId,
            Environment = "NonProduction",
            AccessLevel = "Read",
            Justification = "Concurrent Test"
        };

        var tasks = new List<Task<HttpResponseMessage>>();
        for (int i = 0; i < 5; i++)
        {
            tasks.Add(aliceClient.PostAsJsonAsync("/api/access-requests", createDto));
        }

        var responses = await Task.WhenAll(tasks);
        
        // Ensure all are successful
        foreach(var response in responses)
        {
            response.EnsureSuccessStatusCode();
        }

        // All should refer to the same ID
        var createdRequests = await Task.WhenAll(responses.Select(async r => await r.Content.ReadFromJsonAsync<AccessRequestResponseDto>()));
        
        var id = createdRequests[0]!.Id;
        foreach(var req in createdRequests)
        {
            Assert.Equal(id, req!.Id);
        }

        // Check DB for exact count of rows with this ClientRequestId
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var count = await db.AccessRequests.CountAsync(ar => ar.ClientRequestId == clientId);
        Assert.Equal(1, count);
    }

    [Fact]
    public async Task ConcurrentApproval_ShouldFailWithConflict()
    {
        var aliceClient = CreateClientWithUser("alice@example.local");
        var bobClient = CreateClientWithUser("bob@example.local");
        var crmId = await GetApplicationId("CRM");
        
        var createDto = new CreateAccessRequestDto
        {
            ClientRequestId = Guid.NewGuid().ToString(),
            ApplicationId = crmId,
            Environment = "NonProduction",
            AccessLevel = "Read",
            Justification = "Concurrent Approval Test"
        };
        var resp = await aliceClient.PostAsJsonAsync("/api/access-requests", createDto);
        var req = await resp.Content.ReadFromJsonAsync<AccessRequestResponseDto>();

        var tasks = new List<Task<HttpResponseMessage>>
        {
            bobClient.PostAsync($"/api/access-requests/{req!.Id}/approve", null),
            bobClient.PostAsJsonAsync($"/api/access-requests/{req!.Id}/reject", new RejectRequestDto { Reason = "Reject" })
        };

        var responses = await Task.WhenAll(tasks);

        var successCount = responses.Count(r => r.IsSuccessStatusCode);
        var conflictCount = responses.Count(r => r.StatusCode == HttpStatusCode.Conflict);

        Assert.Equal(1, successCount);
        Assert.Equal(1, conflictCount);
        
        // Verify only 1 audit event was created for the transition from WaitingForManager
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var auditCount = await db.AuditEvents.CountAsync(a => a.AccessRequestId == req.Id && a.Action != "Created");
        Assert.Equal(1, auditCount);
    }

    [Fact]
    public async Task RejectedRequest_CannotBeProcessedAgain()
    {
        var aliceClient = CreateClientWithUser("alice@example.local");
        var bobClient = CreateClientWithUser("bob@example.local");
        var crmId = await GetApplicationId("CRM");
        
        var createDto = new CreateAccessRequestDto
        {
            ClientRequestId = Guid.NewGuid().ToString(),
            ApplicationId = crmId,
            Environment = "NonProduction",
            AccessLevel = "Read",
            Justification = "Terminal State Test"
        };
        var resp = await aliceClient.PostAsJsonAsync("/api/access-requests", createDto);
        var req = await resp.Content.ReadFromJsonAsync<AccessRequestResponseDto>();

        // 1. Reject
        var rejectResp = await bobClient.PostAsJsonAsync($"/api/access-requests/{req!.Id}/reject", new RejectRequestDto { Reason = "No" });
        rejectResp.EnsureSuccessStatusCode();

        // 2. Try Approve -> Conflict
        var approveResp2 = await bobClient.PostAsync($"/api/access-requests/{req.Id}/approve", null);
        Assert.Equal(HttpStatusCode.Conflict, approveResp2.StatusCode);

        // 3. Try Reject Again -> Conflict
        var rejectResp2 = await bobClient.PostAsJsonAsync($"/api/access-requests/{req.Id}/reject", new RejectRequestDto { Reason = "Still No" });
        Assert.Equal(HttpStatusCode.Conflict, rejectResp2.StatusCode);

        // Verify status is still Rejected
        var getResp = await aliceClient.GetAsync($"/api/access-requests/{req.Id}");
        var content = await getResp.Content.ReadAsStringAsync();
        Assert.Contains("\"status\":\"Rejected\"", content);
    }
}

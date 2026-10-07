using AccessRequestHub.Api.Models;

namespace AccessRequestHub.Api.Dtos
{
    public class AccessRequestResponseDto
    {
        public int Id { get; set; }
        public string ClientRequestId { get; set; } = string.Empty;
        public int RequesterId { get; set; }
        public string RequesterEmail { get; set; } = string.Empty;
        public int ApplicationId { get; set; }
        public string ApplicationName { get; set; } = string.Empty;
        public string Environment { get; set; } = string.Empty;
        public string AccessLevel { get; set; } = string.Empty;
        public string Justification { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string? PolicyVersion { get; set; }
        public Guid Version { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }

        public static AccessRequestResponseDto FromEntity(AccessRequest request)
        {
            return new AccessRequestResponseDto
            {
                Id = request.Id,
                ClientRequestId = request.ClientRequestId,
                RequesterId = request.RequesterId,
                RequesterEmail = request.Requester?.Email ?? string.Empty,
                ApplicationId = request.ApplicationId,
                ApplicationName = request.Application?.Name ?? string.Empty,
                Environment = request.Environment,
                AccessLevel = request.AccessLevel,
                Justification = request.Justification,
                Status = request.Status,
                PolicyVersion = request.PolicyVersion,
                Version = request.Version,
                CreatedAt = request.CreatedAt,
                UpdatedAt = request.UpdatedAt
            };
        }
    }
}

using AccessRequestHub.Api.Data;
using AccessRequestHub.Api.Dtos;
using AccessRequestHub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AccessRequestHub.Api.Services
{
    public class AccessRequestService
    {
        private readonly AppDbContext _context;

        public AccessRequestService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<(bool success, AccessRequest? request, string? error)> CreateRequestAsync(CreateAccessRequestDto dto, User requester)
        {
            // Check for idempotency
            var existingRequest = await _context.AccessRequests
                .Include(r => r.Application)
                .Include(r => r.Requester)
                .FirstOrDefaultAsync(r => r.ClientRequestId == dto.ClientRequestId);

            if (existingRequest != null)
            {
                return (true, existingRequest, null); // Return existing on idempotent create
            }

            var application = await _context.Applications.FindAsync(dto.ApplicationId);
            if (application == null)
            {
                return (false, null, "Application not found");
            }

            var request = new AccessRequest
            {
                ClientRequestId = dto.ClientRequestId,
                RequesterId = requester.Id,
                ApplicationId = dto.ApplicationId,
                Environment = dto.Environment,
                AccessLevel = dto.AccessLevel,
                Justification = dto.Justification,
                Status = "WaitingForManager",
                PolicyVersion = dto.PolicyVersion,
                CreatedAt = DateTimeOffset.UtcNow,
                UpdatedAt = DateTimeOffset.UtcNow
            };

            _context.AccessRequests.Add(request);

            var auditEvent = new AuditEvent
            {
                AccessRequest = request,
                Action = "Created",
                PerformedById = requester.Id,
                NewStatus = "WaitingForManager",
                Timestamp = DateTimeOffset.UtcNow
            };
            
            _context.AuditEvents.Add(auditEvent);

            try
            {
                await _context.SaveChangesAsync();
                
                // load navigation properties for return
                request.Application = application;
                request.Requester = requester;
                
                return (true, request, null);
            }
            catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("UNIQUE constraint failed") == true)
            {
                // Handle concurrent creation with same ClientRequestId
                var concurrentExisting = await _context.AccessRequests
                    .Include(r => r.Application)
                    .Include(r => r.Requester)
                    .FirstOrDefaultAsync(r => r.ClientRequestId == dto.ClientRequestId);
                
                if (concurrentExisting != null)
                {
                    return (true, concurrentExisting, null);
                }
                return (false, null, "Concurrent creation failed");
            }
        }

        private bool IsHighRisk(AccessRequest request)
        {
            return request.Environment == "Production" || request.AccessLevel == "Admin";
        }

        public async Task<(bool success, string error)> ApproveRequestAsync(int id, User approver)
        {
            var request = await _context.AccessRequests
                .Include(r => r.Requester)
                .Include(r => r.Application)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null)
                return (false, "Not Found");

            if (request.RequesterId == approver.Id)
                return (false, "Forbidden: Cannot approve own request");

            var oldStatus = request.Status;
            string newStatus;
            string action;

            if (request.Status == "WaitingForManager")
            {
                if (request.Requester?.ManagerId != approver.Id)
                    return (false, "Forbidden: Only the manager can approve this request");

                newStatus = IsHighRisk(request) ? "WaitingForSystemOwner" : "Approved";
                action = "ManagerApproved";
            }
            else if (request.Status == "WaitingForSystemOwner")
            {
                if (request.Application?.SystemOwnerId != approver.Id)
                    return (false, "Forbidden: Only the system owner can approve this request");

                newStatus = "Approved";
                action = "SystemOwnerApproved";
            }
            else
            {
                return (false, "Conflict: Request is not in an approvable state");
            }

            request.Status = newStatus;
            request.UpdatedAt = DateTimeOffset.UtcNow;
            // Update version token
            request.Version = Guid.NewGuid();

            var auditEvent = new AuditEvent
            {
                AccessRequestId = request.Id,
                Action = action,
                PerformedById = approver.Id,
                OldStatus = oldStatus,
                NewStatus = newStatus,
                Timestamp = DateTimeOffset.UtcNow
            };

            _context.AuditEvents.Add(auditEvent);

            try
            {
                await _context.SaveChangesAsync();
                return (true, string.Empty);
            }
            catch (DbUpdateConcurrencyException)
            {
                return (false, "Conflict: The request was modified by another process");
            }
        }

        public async Task<(bool success, string error)> RejectRequestAsync(int id, User rejecter, string reason)
        {
            var request = await _context.AccessRequests
                .Include(r => r.Requester)
                .Include(r => r.Application)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null)
                return (false, "Not Found");
                
            if (request.RequesterId == rejecter.Id)
                return (false, "Forbidden: Cannot reject own request");

            var oldStatus = request.Status;
            string action;

            if (request.Status == "WaitingForManager")
            {
                if (request.Requester?.ManagerId != rejecter.Id)
                    return (false, "Forbidden: Only the manager can reject this request");
                action = "ManagerRejected";
            }
            else if (request.Status == "WaitingForSystemOwner")
            {
                if (request.Application?.SystemOwnerId != rejecter.Id)
                    return (false, "Forbidden: Only the system owner can reject this request");
                action = "SystemOwnerRejected";
            }
            else
            {
                return (false, "Conflict: Request is not in a rejectable state");
            }

            request.Status = "Rejected";
            request.UpdatedAt = DateTimeOffset.UtcNow;
            request.Version = Guid.NewGuid();

            var auditEvent = new AuditEvent
            {
                AccessRequestId = request.Id,
                Action = action,
                PerformedById = rejecter.Id,
                Reason = reason,
                OldStatus = oldStatus,
                NewStatus = "Rejected",
                Timestamp = DateTimeOffset.UtcNow
            };

            _context.AuditEvents.Add(auditEvent);

            try
            {
                await _context.SaveChangesAsync();
                return (true, string.Empty);
            }
            catch (DbUpdateConcurrencyException)
            {
                return (false, "Conflict: The request was modified by another process");
            }
        }

        public async Task<List<AccessRequest>> GetRequestsForUserAsync(User user)
        {
            var query = _context.AccessRequests
                .Include(r => r.Requester)
                .Include(r => r.Application)
                .AsQueryable();

            if (user.Role == "Admin")
            {
                // Can view all
            }
            else if (user.Role == "Requester")
            {
                query = query.Where(r => r.RequesterId == user.Id);
            }
            else if (user.Role == "Manager")
            {
                query = query.Where(r => r.RequesterId == user.Id || r.Requester!.ManagerId == user.Id);
            }
            else if (user.Role == "SystemOwner")
            {
                query = query.Where(r => r.RequesterId == user.Id || r.Application!.SystemOwnerId == user.Id);
            }

            var list = await query.ToListAsync();
            return list.OrderByDescending(r => r.CreatedAt).ToList();
        }

        public async Task<List<AccessRequest>> GetPendingApprovalsAsync(User user)
        {
            var query = _context.AccessRequests
                .Include(r => r.Requester)
                .Include(r => r.Application)
                .AsQueryable();

            if (user.Role == "Manager")
            {
                query = query.Where(r => r.Status == "WaitingForManager" && r.Requester!.ManagerId == user.Id);
            }
            else if (user.Role == "SystemOwner")
            {
                query = query.Where(r => r.Status == "WaitingForSystemOwner" && r.Application!.SystemOwnerId == user.Id);
            }
            else
            {
                return new List<AccessRequest>();
            }

            var pendingList = await query.ToListAsync();
            return pendingList.OrderByDescending(r => r.CreatedAt).ToList();
        }

        public async Task<AccessRequest?> GetRequestByIdAsync(int id, User user)
        {
            var request = await _context.AccessRequests
                .Include(r => r.Requester)
                .Include(r => r.Application)
                .Include(r => r.AuditTrail)
                    .ThenInclude(a => a.PerformedBy)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null)
                return null;

            if (user.Role == "Admin")
                return request;

            if (request.RequesterId == user.Id)
                return request;

            if (request.Requester?.ManagerId == user.Id)
                return request;

            if (request.Application?.SystemOwnerId == user.Id)
                return request;

            return null; // Forbidden conceptually, returned as null here for simplicity, controller handles it
        }
    }
}

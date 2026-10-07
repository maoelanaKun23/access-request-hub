using AccessRequestHub.Api.Models;

namespace AccessRequestHub.Api.Dtos
{
    public class AuditEventResponseDto
    {
        public int Id { get; set; }
        public string Action { get; set; } = string.Empty;
        public int PerformedById { get; set; }
        public string PerformedByEmail { get; set; } = string.Empty;
        public string? Reason { get; set; }
        public string? OldStatus { get; set; }
        public string NewStatus { get; set; } = string.Empty;
        public DateTimeOffset Timestamp { get; set; }

        public static AuditEventResponseDto FromEntity(AuditEvent evt)
        {
            return new AuditEventResponseDto
            {
                Id = evt.Id,
                Action = evt.Action,
                PerformedById = evt.PerformedById,
                PerformedByEmail = evt.PerformedBy?.Email ?? string.Empty,
                Reason = evt.Reason,
                OldStatus = evt.OldStatus,
                NewStatus = evt.NewStatus,
                Timestamp = evt.Timestamp
            };
        }
    }
}

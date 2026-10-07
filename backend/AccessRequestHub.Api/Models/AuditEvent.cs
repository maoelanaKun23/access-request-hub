using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessRequestHub.Api.Models
{
    public class AuditEvent
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AccessRequestId { get; set; }

        [ForeignKey(nameof(AccessRequestId))]
        public AccessRequest? AccessRequest { get; set; }

        [Required]
        [MaxLength(50)]
        public string Action { get; set; } = string.Empty;

        [Required]
        public int PerformedById { get; set; }

        [ForeignKey(nameof(PerformedById))]
        public User? PerformedBy { get; set; }

        public string? Reason { get; set; }

        [MaxLength(50)]
        public string? OldStatus { get; set; }

        [Required]
        [MaxLength(50)]
        public string NewStatus { get; set; } = string.Empty;

        public DateTimeOffset Timestamp { get; set; }
    }
}

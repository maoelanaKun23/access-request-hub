using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessRequestHub.Api.Models
{
    public class AccessRequest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string ClientRequestId { get; set; } = string.Empty;

        [Required]
        public int RequesterId { get; set; }
        
        [ForeignKey(nameof(RequesterId))]
        public User? Requester { get; set; }

        [Required]
        public int ApplicationId { get; set; }

        [ForeignKey(nameof(ApplicationId))]
        public Application? Application { get; set; }

        [Required]
        [MaxLength(50)]
        public string Environment { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string AccessLevel { get; set; } = string.Empty;

        [Required]
        public string Justification { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? PolicyVersion { get; set; }

        [ConcurrencyCheck]
        public Guid Version { get; set; } = Guid.NewGuid();

        public DateTimeOffset CreatedAt { get; set; }
        
        public DateTimeOffset UpdatedAt { get; set; }

        public ICollection<AuditEvent> AuditTrail { get; set; } = new List<AuditEvent>();
    }
}

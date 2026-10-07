using System.ComponentModel.DataAnnotations;

namespace AccessRequestHub.Api.Dtos
{
    public class CreateAccessRequestDto
    {
        [Required]
        public string ClientRequestId { get; set; } = string.Empty;

        [Required]
        public int ApplicationId { get; set; }

        [Required]
        public string Environment { get; set; } = string.Empty;

        [Required]
        public string AccessLevel { get; set; } = string.Empty;

        [Required]
        public string Justification { get; set; } = string.Empty;

        public string? PolicyVersion { get; set; }
    }
}

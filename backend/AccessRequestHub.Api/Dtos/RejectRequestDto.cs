using System.ComponentModel.DataAnnotations;

namespace AccessRequestHub.Api.Dtos
{
    public class RejectRequestDto
    {
        [Required]
        public string Reason { get; set; } = string.Empty;
    }
}

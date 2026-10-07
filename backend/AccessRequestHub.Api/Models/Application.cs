using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessRequestHub.Api.Models
{
    public class Application
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int SystemOwnerId { get; set; }

        [ForeignKey(nameof(SystemOwnerId))]
        public User? SystemOwner { get; set; }
    }
}

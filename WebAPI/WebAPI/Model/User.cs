using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [StringLength(255, MinimumLength = 1)]
        public string UserName { get; set; } = string.Empty;

        [StringLength(255, MinimumLength = 1)]
        public string Password { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Email { get; set; }

        [StringLength(20)]
        public string? Phone { get; set; }

        public ICollection<Rating>? Ratings { get; set; }

        public ICollection<Vote>? Votes { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Rating
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RateId { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        [Range(1, 5)]
        public int RatingStar { get; set; }

        [StringLength(3000)]
        public string? RatingComment { get; set; } = string.Empty;
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Model
{
    public class Publisher
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PublisherId { get; set; }

        [Required(ErrorMessage = "Publisher name is required.")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Publisher name must be between 1 and 100 characters.")]
        public string PublisherName { get; set; } = string.Empty;

        [StringLength(2000, ErrorMessage = "Publisher URL must be at most 2000 characters.")]
        public string? PublisherUrl { get; set; } = string.Empty;
        public ICollection<Book> Books { get; set; } = new List<Book>();
    }
}

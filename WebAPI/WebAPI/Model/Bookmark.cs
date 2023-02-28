using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Bookmark
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookmarkId { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; } = new();

        public int UserId { get; set; }
        public User User { get; set; } = new();

        public int MarkPage { get; set; }
        public DateTime MarkTime { get; set; }

        [StringLength(3000)]
        public string? Description { get; set; } = string.Empty;
    }
}

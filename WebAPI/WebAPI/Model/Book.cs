using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookId { get; set; }

        [DisplayName("Book Title")]
        [StringLength(100, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;

        [StringLength(int.MaxValue)]
        public string? Description { get; set; } = string.Empty;

        [StringLength(500)]
        public string? CoverImage { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int? CategoryId { get; set; }

        public Category? Category { get; set; } = new();

        public int? AuthorId { get; set; }

        public Author? Author { get; set; } = new();

        public DateTime PublicationDate { get; set; }

        public int TotalPage { get; set; }

        public int? PublisherId { get; set; }

        public Publisher? Publisher { get; set; } = new();

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public ICollection<Vote>? Votes { get; set; }

        public ICollection<Rating>? Ratings { get; set; }

        public ICollection<Bookmark>? Bookmarks { get; set; }
    }
}

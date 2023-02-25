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
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 100 characters.")]
        public string Title { get; set; } = string.Empty;

        [StringLength(int.MaxValue)]
        public string? Description { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Cover image URL must be at most 500 characters.")]
        public string? CoverImage { get; set; } = string.Empty;

        [Required(ErrorMessage ="Price is required.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Category is required.")]
        public int CategoryId { get; set; }

        public Category Category { get; set; }

        [Required(ErrorMessage = "Author is required.")]
        public int AuthorId { get; set; }

        public Author Author { get; set; }

        public DateTime PublicationDate { get; set; }

        [Required]
        public int TotalPage { get; set; }

        [Required(ErrorMessage = "Publisher is required.")]
        public int PublisherId { get; set; }

        public Publisher Publisher { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}

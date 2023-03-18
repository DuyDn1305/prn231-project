using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using WebAPI.Model;

namespace WebAPI.Dto
{
    public class BookDTO
    {
        public int BookId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public string? CoverImage { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string CategoryName { get; set; } = string.Empty;

        public string AuthorName { get; set; } = string.Empty;

        public DateTime PublicationDate { get; set; }

        public int TotalPage { get; set; }

        public string PublisherName { get; set; } = string.Empty;

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}

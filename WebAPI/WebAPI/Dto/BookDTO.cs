namespace WebAPI.Dto
{
    public class BookDTO
    {
        public int BookId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public string? CoverImage { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int? CategoryId { get; set; }

        public string CategoryName { get; set; } = string.Empty;

        public int? AuthorId { get; set; }

        public string? AuthorDescription { get; set; } = string.Empty;

        public string? AuthorUrl { get; set; } = string.Empty;

        public string? Nation { get; set; } = string.Empty;

        public string AuthorName { get; set; } = string.Empty;

        public DateTime PublicationDate { get; set; }

        public int TotalPage { get; set; }

        public int? PublisherId { get; set; }

        public string? PublisherUrl { get; set; } = string.Empty;

        public string PublisherName { get; set; } = string.Empty;

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}

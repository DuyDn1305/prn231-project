﻿using Imagekit.Constant;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Model
{
    public class Author
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AuthorId { get; set; }

        [Required(ErrorMessage = "Author name is required.")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Author name must be between 1 and 100 characters.")]
        public string AuthorName { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Author description must be at most 500 characters.")]
        public string? AuthorDescription { get; set; } = string.Empty;

        [StringLength(2000, ErrorMessage = "Author image URL must be at most 2000 characters.")]
        public string? AuthorImage { get; set; } = string.Empty;

        [StringLength(2000, ErrorMessage = "Author URL must be at most 2000 characters.")]
        public string? AuthorUrl { get; set; } = string.Empty;

        [StringLength(100, ErrorMessage = "Nation must be at most 100 characters.")]
        public string? Nation { get; set; } = string.Empty;

        public ICollection<Book> Books { get; set; } = new List<Book>();
    }
}

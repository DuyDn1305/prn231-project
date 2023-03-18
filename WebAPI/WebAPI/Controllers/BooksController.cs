using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using WebAPI.Model;
using WebAPI.Repository;
using Imagekit.Util;
using System.Net;

namespace WebAPI.Controllers
{
    public class BooksController : BaseController
    {
        private readonly BookRepository _bookRepository;
        private readonly AuthorRepository _authorRepository;
        private readonly CategoryRepository _categoryRepository;
        private readonly PublisherRepository _publisherRepository;


        public BooksController(BookRepository bookRepository, AuthorRepository authorRepository, CategoryRepository categoryRepository, PublisherRepository publisherRepository)
        {
            _bookRepository = bookRepository;
            _authorRepository =authorRepository;
            _categoryRepository =categoryRepository;
            _publisherRepository =publisherRepository;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Book>> GetBooks(int total, int page)
        {
            ICollection<Book> books = _bookRepository.GetBooks(total,page);
            return Ok(books);
        }

        [HttpGet("{bookId:int}")]
        [ProducesResponseType(200, Type = typeof(Book))]
        [ProducesResponseType(400)]
        public IActionResult GetBookById(int bookId)
        {
            if (!_bookRepository.IsBookExits(bookId))
            {
                return NotFound();
            }
            Book book = _bookRepository.GetBookById(bookId);
            return !ModelState.IsValid ? BadRequest(ModelState) : Ok(book);
        }


        [HttpGet("{name}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Book>))]
        [ProducesResponseType(400)]
        public IActionResult GetBookByName(string name)
        {
            ICollection<Book> books = _bookRepository.GetBookByName(name);
            return !ModelState.IsValid ? BadRequest(ModelState) : Ok(books);
        }


        [HttpPut("{bookId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public ActionResult UpdateBook(int bookId, [FromBody] Book updateBook)
        {
            if (updateBook == null)
            {
                return BadRequest();
            }

            if (bookId != updateBook.BookId)
            {
                return BadRequest();
            }

            if (!_bookRepository.IsBookExits(bookId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool bookUpdated = _bookRepository.UpdateBook(updateBook);

            if (!bookUpdated)
            {
                ModelState.AddModelError("", "Something went wrong updating book");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook([FromForm] BookRequest bookRequest)
        {
            if (bookRequest == null)
            {
                return BadRequest(ModelState);
            }

            // Check if a book with the same title already exists
            bool bookExists = _bookRepository.GetBooks()
                 .Any(b => b.Title.Trim()
                                  .Equals(bookRequest.Title.Trim(), StringComparison.OrdinalIgnoreCase));

            if (bookExists)
            {
                ModelState.AddModelError("", "Book with the same title already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool bookCreated = _bookRepository.CreateBook(new()
            {
                Title = bookRequest.Title,
                Description = bookRequest.Description,
                CoverImage = await Util.Upload(bookRequest.CoverImage),
                Price  = bookRequest.Price,
                CategoryId = bookRequest.CategoryId,
                Category = _categoryRepository.GetCategoryById(bookRequest.CategoryId),
                AuthorId = bookRequest.AuthorId,
                Author = _authorRepository.GetAuthorById(bookRequest.AuthorId),
                PublicationDate = bookRequest.PublicationDate,
                TotalPage = bookRequest.TotalPage,
                PublisherId = bookRequest.PublisherId,
                Publisher = _publisherRepository.GetPublisherById(bookRequest.PublisherId)
        });

            if (!bookCreated)
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


        [HttpDelete("{bookId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteCategory(int bookId)
        {
            if (!_bookRepository.IsBookExits(bookId))
            {
                return NotFound();
            }

            Book deleteBook = _bookRepository.GetBookById(bookId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_bookRepository.DeleteBook(deleteBook))
            {
                ModelState.AddModelError("", "Something went wrong deleting book");
            }

            return NoContent();
        }
    }
}

public class BookRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; }
    public IFormFile CoverImage { get; set; } = null!;

    public int CategoryId { get; set; }

    public int AuthorId { get; set; }

    public DateTime PublicationDate { get; set; }

    public int TotalPage { get; set; }

    public int PublisherId { get; set; }
}

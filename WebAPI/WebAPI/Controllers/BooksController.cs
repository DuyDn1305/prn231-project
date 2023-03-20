using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dto;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Controllers
{
    [Authorize]
    public class BooksController : BaseController
    {
        private readonly BookRepository _bookRepository;
        private readonly AuthorRepository _authorRepository;
        private readonly CategoryRepository _categoryRepository;
        private readonly PublisherRepository _publisherRepository;


        public BooksController(BookRepository bookRepository, AuthorRepository authorRepository, CategoryRepository categoryRepository, PublisherRepository publisherRepository)
        {
            _bookRepository = bookRepository;
            _authorRepository = authorRepository;
            _categoryRepository = categoryRepository;
            _publisherRepository = publisherRepository;
        }
        [HttpGet]
        public IActionResult GetBooks(int pageSize = 10, string startCursor = null)
        {
            ICollection<BookDTO> bookDTOs = _bookRepository.GetBookDTOs(pageSize, startCursor);
            bool hasNextPage = bookDTOs.Count == pageSize;

            // Get the cursor of the last book on the page
            string? endCursor = bookDTOs.LastOrDefault()?.BookId.ToString();

            // Create a result object with the books and pagination info
            var result = new
            {
                books = bookDTOs,
                pageInfo = new
                {
                    count = _bookRepository.BookCount(),
                    hasNextPage,
                    endCursor
                }
            };

            return Ok(result);
        }


        [HttpGet("count")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<int> BookCount()
        {
            int count = _bookRepository.BookCount();
            return Ok(count);
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
            BookDTO book = _bookRepository.GetBookById(bookId);
            return !ModelState.IsValid ? BadRequest(ModelState) : Ok(book);
        }


        [HttpGet("search")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Book>))]
        [ProducesResponseType(400)]
        public IActionResult GetBookByName(string name)
        {
            ICollection<BookDTO> books = _bookRepository.GetBookByName(name);
            return !ModelState.IsValid ? BadRequest(ModelState) : Ok(books);
        }

        [HttpGet("user/{username}")]
        public ActionResult<IEnumerable<Book>> GetBooksByUsername(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest();
            }
            ICollection<Book> books = _bookRepository.GetBookByUsername(username);
            return Ok(books);
        }

        [HttpGet("user/{username}/{bookname}")]
        public ActionResult<IEnumerable<Book>> GetBooksByGivenUsername(string username,string bookname)
        {
            if (string.IsNullOrEmpty(username)|| string.IsNullOrEmpty(bookname))
            {
                return BadRequest();
            }
            ICollection<Book> books = _bookRepository.GetBookByUsernameWithUser(bookname,username);
            if (books == null)
            {
                ModelState.AddModelError("", "Could not find book with the given username");
            }
            return Ok(books);
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
            bool bookExists = _bookRepository.GetAllBooks()
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
                Price = bookRequest.Price,
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

            BookDTO deleteBook = _bookRepository.GetBookById(bookId);
            ICollection<Book> books = _bookRepository.GetAllBooks();
            Book selectedBook = books.FirstOrDefault(b => b.BookId == deleteBook.BookId);

            if (selectedBook == null)
            {
                ModelState.AddModelError("", "Something went wrong deleting book");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_bookRepository.DeleteBook(selectedBook))
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

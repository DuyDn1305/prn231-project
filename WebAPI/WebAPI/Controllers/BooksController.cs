using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Controllers
{
    public class BooksController : BaseController
    {
        private readonly BookRepository _bookRepository;

        public BooksController(BookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<Book>> GetBooks()
        {
            ICollection<Book> books = _bookRepository.GetBooks();
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
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateBook([FromBody] Book bookCreate)
        {
            if (bookCreate == null)
            {
                return BadRequest(ModelState);
            }

            // Check if a book with the same title already exists
            bool bookExists = _bookRepository.GetBooks()
                 .Any(b => b.Title.Trim()
                                  .Equals(bookCreate.Title.Trim(), StringComparison.OrdinalIgnoreCase));

            if (bookExists)
            {
                ModelState.AddModelError("", "Book with the same title already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool bookCreated = _bookRepository.CreateBook(bookCreate);

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

using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Controllers
{
    public class AuthorsController : BaseController
    {
        private readonly AuthorRepository _authorRepository;

        public AuthorsController(AuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Author>))]
        public IActionResult GetAuthors()
        {
            ICollection<Author> authors = _authorRepository.GetAuthors();
            return Ok(authors);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Author))]
        [ProducesResponseType(404)]
        public IActionResult GetAuthorById(int id)
        {
            if (!_authorRepository.IsAuthorExits(id))
            {
                return NotFound();
            }

            Author author = _authorRepository.GetAuthorById(id);
            return Ok(author);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Author))]
        [ProducesResponseType(400)]
        public IActionResult CreateAuthor([FromBody] Author author)
        {
            if (author == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool created = _authorRepository.CreateAuthor(author);

            if (!created)
            {
                ModelState.AddModelError("", "Something went wrong while saving the author");
                return StatusCode(500, ModelState);
            }

            return CreatedAtAction(nameof(GetAuthorById), new { id = author.AuthorId }, author);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdateAuthor(int id, [FromBody] Author author)
        {
            if (author == null || id != author.AuthorId)
            {
                return BadRequest();
            }

            if (!_authorRepository.IsAuthorExits(id))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool updated = _authorRepository.UpdateAuthor(author);

            if (!updated)
            {
                ModelState.AddModelError("", "Something went wrong while updating the author");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteAuthor(int id)
        {
            if (!_authorRepository.IsAuthorExits(id))
            {
                return NotFound();
            }

            Author author = _authorRepository.GetAuthorById(id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool deleted = _authorRepository.DeleteAuthor(author);

            if (!deleted)
            {
                ModelState.AddModelError("", "Something went wrong while deleting the author");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

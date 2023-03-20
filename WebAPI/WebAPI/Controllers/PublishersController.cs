using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Controllers
{

    [Authorize]
    public class PublishersController : BaseController
    {
        private readonly PublisherRepository _publisherRepository;

        public PublishersController(PublisherRepository publisherRepository)
        {
            _publisherRepository = publisherRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Publisher>))]
        public IActionResult GetPublishers()
        {
            ICollection<Publisher> publishers = _publisherRepository.GetPublishers();
            return Ok(publishers);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Publisher))]
        [ProducesResponseType(404)]
        public IActionResult GetPublisherById(int id)
        {
            Publisher publisher = _publisherRepository.GetPublisherById(id);
            return publisher == null ? NotFound() : Ok(publisher);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Publisher))]
        [ProducesResponseType(400)]
        public IActionResult CreatePublisher([FromBody] Publisher publisher)
        {
            if (publisher == null)
            {
                return BadRequest();
            }

            if (_publisherRepository.IsPublisherExits(publisher.PublisherId))
            {
                ModelState.AddModelError("", $"Publisher with id {publisher.PublisherId} already exists");
                return Conflict(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_publisherRepository.CreatePublisher(publisher))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return CreatedAtAction(nameof(GetPublisherById), new { id = publisher.PublisherId }, publisher);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdatePublisher(int id, [FromBody] Publisher publisher)
        {
            if (publisher == null)
            {
                return BadRequest();
            }

            if (id != publisher.PublisherId)
            {
                return BadRequest();
            }

            if (!_publisherRepository.IsPublisherExits(id))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_publisherRepository.UpdatePublisher(publisher))
            {
                ModelState.AddModelError("", "Something went wrong while updating");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeletePublisher(int id)
        {
            Publisher publisher = _publisherRepository.GetPublisherById(id);
            if (publisher == null)
            {
                return NotFound();
            }

            if (!_publisherRepository.DeletePublisher(publisher))
            {
                ModelState.AddModelError("", "Something went wrong while deleting");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

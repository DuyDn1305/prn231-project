using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Controllers
{
    public class RatingsController : BaseController
    {
        private readonly RatingRepository _ratingRepository;

        public RatingsController(RatingRepository ratingRepository)
        {
            _ratingRepository = ratingRepository;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateRating([FromBody] Rating ratingCreate)
        {
            if (ratingCreate == null)
            {
                return BadRequest(ModelState);
            }

            // Check if a book with the same title already exists
            bool ratingExist = _ratingRepository.GetRatings().Any(u => u.BookId == ratingCreate.BookId && u.UserId==ratingCreate.UserId);

            if (ratingExist)
            {
                ModelState.AddModelError("", "Rating already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool ratingCreated = _ratingRepository.CreateRating(ratingCreate);

            if (!ratingCreated)
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

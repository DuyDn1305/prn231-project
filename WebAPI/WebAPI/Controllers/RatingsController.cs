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

        [HttpGet("book/{bookId:int}")]
        [ProducesResponseType(200, Type = typeof(Rating))]
        [ProducesResponseType(400)]
        public IActionResult GetRatingsByBookId(int bookId)
        {
            if (!_ratingRepository.IsBookExits(bookId))
            {
                return NotFound();
            }
            ICollection<Rating> ratings = _ratingRepository.GetRatingsByBookId(bookId);
            return !ModelState.IsValid ? BadRequest(ModelState) : Ok(ratings);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(Rating))]
        [ProducesResponseType(400)]
        public IActionResult GetRatings()
        {
            ICollection<Rating> ratings = _ratingRepository.GetRatings();
            return !ModelState.IsValid ? BadRequest(ModelState) : Ok(ratings);
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Controllers
{

    [Authorize]
    public class VotesController : BaseController
    {
        private readonly VoteRepositorry _voteRepositorry;

        public VotesController(VoteRepositorry voteRepositorry)
        {
            _voteRepositorry = voteRepositorry;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateVote([FromBody] Vote voteCreate)
        {
            if (voteCreate == null)
            {
                return BadRequest(ModelState);
            }

            // Check if a book with the same title already exists
            bool voteExist = _voteRepositorry.GetVotes().Any(u => u.BookId == voteCreate.BookId && u.UserId == voteCreate.UserId);

            if (voteExist)
            {
                ModelState.AddModelError("", "Vote already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool voteCreated = _voteRepositorry.CreateVote(voteCreate);

            if (!voteCreated)
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

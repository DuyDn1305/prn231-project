using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dto;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Controllers
{

    [Authorize]
    public class VotesController : BaseController
    {
        private readonly VoteRepositorry _voteRepository;
        private readonly BookRepository _bookRepository;
        private readonly UserRepository _userRepository;


        public VotesController(VoteRepositorry voteRepository, BookRepository bookRepository, UserRepository userRepository)
        {
            _voteRepository = voteRepository;
            _bookRepository = bookRepository;
            _userRepository = userRepository;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateVoteAsync([FromBody] VoteDto voteCreate)
        {
            if (voteCreate == null)
            {
                return BadRequest(ModelState);
            }

            // Check if a book with the same title already exists
            bool voteExist = _voteRepository.GetVotes().Any(u => u.BookId == voteCreate.BookId && u.User!.UserName == voteCreate.Username);

            if (voteExist)
            {
                ModelState.AddModelError("", "Vote already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User? u = await _userRepository.FindByNameAsync(voteCreate.Username);

            bool voteCreated = _voteRepository.CreateVote(new Vote
            {
                VoteId = 0,
                VoteValue = voteCreate.VoteValue,
                UserId = u.UserId,
                User = u,
                BookId = voteCreate.BookId,
                Book = _bookRepository.GetBookDefaultById(voteCreate.BookId)
            });

            if (!voteCreated)
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

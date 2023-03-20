﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Controllers
{
    [Authorize]
    public class UsersController : BaseController
    {
        private readonly UserRepository _userRepository;

        public UsersController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUser([FromBody] User UserCreate)
        {
            if (UserCreate == null)
            {
                return BadRequest(ModelState);
            }

            // Check if a book with the same title already exists
            bool userExits = _userRepository.GetUsers().Any(u=>u.UserName==UserCreate.UserName);

            if (userExits)
            {
                ModelState.AddModelError("isUsernameExist", "Username already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserCreate.Password = BCrypt.Net.BCrypt.HashPassword(UserCreate.Password);
            bool userCreated = _userRepository.CreateUser(UserCreate);

            if (!userCreated)
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetRatings()
        {
            ICollection<User> users = _userRepository.GetUsers();
            return !ModelState.IsValid ? BadRequest(ModelState) : Ok(users);
        }

        [HttpGet("{username}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetUserByUserName(string username)
        {
            User? user = await _userRepository.FindByNameAsync(username)!;
            return !ModelState.IsValid ? BadRequest(ModelState) : Ok(user);
        }

    }
}

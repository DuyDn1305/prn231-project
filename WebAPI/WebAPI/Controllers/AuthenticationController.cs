using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Controllers
{
    public class AuthenticationController : BaseController
    {
        private readonly UserRepository _userManager;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserRepository userRepository, IConfiguration configuration)
        {
            _userManager = userRepository;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(JsonDocument model)
        {
            Console.WriteLine(model.RootElement);
            var tmp = model.RootElement.Deserialize<User>(new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            User? user = await _userManager.FindByNameAsync(tmp.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, tmp.Password))
            {
                List<Claim> authClaims = new()
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
                SymmetricSecurityKey authSigningKey = new(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("Jwt:Key")));

                JwtSecurityToken token = new(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(User model)
        {
            // Check if the model is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the username or email already exists
            if (await _userManager.FindByNameAsync(model.UserName) != null)
            {
                return BadRequest(new { message = "Username already exists" });
            }

            if (await _userManager.FindByEmailAsync(model.Email) != null)
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // Create a new user with the provided username and email
            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                Phone = model.Phone
            };

            // Attempt to create the user with the provided password
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Failed to create user" });
            }

            // Return a success message
            return Ok(new { message = "User created successfully" });
        }
    }
}

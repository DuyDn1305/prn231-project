using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    public class WelcomeController : BaseController
    {
        [HttpGet]
        public IActionResult Welcome()
        {

            return Ok(new
            {
                message = "Welcome to Book API Server",
                books = "http://localhost:5295/api/books",
                ratings = "http://localhost:5295/api/ratings",
                authors = "http://localhost:5295/api/authors",
                user = "http://localhost:5295/api/users",
                version = "1.0"
            }); ;
        }
    }
}

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
                version = "1.0"
            }); ;
        }
    }
}

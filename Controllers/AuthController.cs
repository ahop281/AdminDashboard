using AdminDashboard.Contexts;
using AdminDashboard.Models;
using AdminDashboard.Models.Requests;
using AdminDashboard.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AdminDashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IConfiguration _configuration;
        private IAuthService authService;

        public AuthController(IConfiguration configuration, IAuthService authService)
        {
            _configuration = configuration;
            this.authService = authService;
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignUpRequest request)
        {
            try
            {
                if (request != null && request.Username != null && request.Password != null)
                {
                    var result = await authService.SignUp(request);
                    return Ok(result);
                } 
                else
                {
                    return BadRequest("Invalid Credentials!");
                }
            }
            catch (ADException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInRequest request)
        {
            try
            {
                if (request != null && request.Username != null && request.Password != null)
                {
                    var result = await authService.SignIn(request);
                    return Ok(result);
                } 
                else
                {
                    return BadRequest("Invalid Credentials!");
                }
            }
            catch (ADException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}

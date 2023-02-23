using AdminDashboard.Models.Requests;
using AdminDashboard.Models.Responses;

namespace AdminDashboard.Services
{
    public interface IAuthService
    {
        public Task<SignUpResponse?> SignUp(SignUpRequest request);
        public Task<SignInResponse?> SignIn(SignInRequest request);
    }
}

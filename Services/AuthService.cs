using AdminDashboard.Models;
using AdminDashboard.Models.Requests;
using AdminDashboard.Models.Responses;
using AdminDashboard.Repositories;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AdminDashboard.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepository<User> userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public readonly int EXPIRESIN = 3600;

        public AuthService(IMapper mapper, IConfiguration config, IRepository<User> userRepository)
        {
            _mapper = mapper;
            _config = config;
            this.userRepository = userRepository;
        }

        public async Task<SignUpResponse?> SignUp(SignUpRequest request)
        {
            var existedUser = await userRepository.GetByAttribute("User", "Username", request.Username);
            if (existedUser != null)
            {
                throw new ADException(400, "Username already in used!");
            }
            existedUser = await userRepository.GetByAttribute("User", "Email", request.Email);
            if (existedUser != null)
            {
                throw new ADException(400, "Email already in used!");
            }

            var userEntity = _mapper.Map<User>(request);
            userEntity.CreateAt = DateTime.Now;
            userEntity.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var result = await userRepository.Add(userEntity);
            return _mapper.Map<SignUpResponse>(result);
        }

        public async Task<SignInResponse?> SignIn(SignInRequest request)
        {
            var existedUser = await userRepository.GetByAttribute("User", "Username", request.Username);
            if (existedUser == null)
            {
                throw new ADException(400, "Username not found!");
            }

            var verified = BCrypt.Net.BCrypt.Verify(request.Password, existedUser.Password);
            if (!verified)
            {
                throw new ADException(400, "Incorrect password!");
            }

            var token = GenerateToken(existedUser);
            var result = _mapper.Map<SignInResponse>(existedUser);
            result.AccessToken = token;
            result.Expires = EXPIRESIN;
            return result;
        }

        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var token = new JwtSecurityToken(
                _config["JWT:Issuer"],
                _config["JWT:Audience"],
                claims,
                expires: DateTime.Now.AddSeconds(EXPIRESIN),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

using AdminDashboard.Models;
using AdminDashboard.Models.Requests;
using AdminDashboard.Models.Responses;
using AutoMapper;

namespace AdminDashboard.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<SignUpRequest, User>()
            .ReverseMap();
            
            CreateMap<SignUpResponse, User>()
            .ReverseMap();

            CreateMap<SignInRequest, User>()
            .ReverseMap();
            
            CreateMap<SignInResponse, User>()
            .ReverseMap();

            CreateMap<GetUserRequest, User>()
            .ReverseMap();
            
            CreateMap<GetUserResponse, User>()
            .ReverseMap();


        }
    }
}

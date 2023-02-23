namespace AdminDashboard.Models.Requests
{
    public class SignUpRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public int PhoneNumber { get; set; }
    }
}

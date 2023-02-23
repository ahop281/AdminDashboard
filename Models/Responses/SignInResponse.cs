namespace AdminDashboard.Models.Responses
{
    public class SignInResponse
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public string AccessToken { get; set; }
        public int Expires { get; set; }
    }
}

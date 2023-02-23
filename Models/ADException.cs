namespace AdminDashboard.Models
{
    public class ADException : Exception
    {
        public int StatusCode { get; set; }
        public ADException(int statusCode, string message) : base(message)
        {
            this.StatusCode = statusCode;
        }
    }
}

using System.ComponentModel.DataAnnotations;

namespace AdminDashboard.Models
{
    public class Customer : BaseEntity
    {
        [Required, MaxLength(40)]
        public string FirstName { get; set; }
        [Required, MaxLength(40)]
        public string LastName { get; set; }
        [MaxLength(40)]
        public string? City { get; set; }
        [MaxLength(40)]
        public string? Country { get; set; }
        [MaxLength(40)]
        public string? Phone { get; set; }
    }
}

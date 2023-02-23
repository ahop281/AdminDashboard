using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminDashboard.Models
{
    public class Order : BaseEntity
    {
        public DateTime OrderDate { get; set; }
        [MaxLength(10)]
        public string? OrderNumber { get; set; }
        public int CustomerId { get; set; }
        [Column(TypeName = "decimal(12,2)")]
        public decimal? TotalAmount { get; set; }

        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }  
    }
}

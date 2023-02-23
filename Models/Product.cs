using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminDashboard.Models
{
    public class Product : BaseEntity
    {
        [Required, MaxLength(50)]
        public string ProductName { get; set; }
        [Required]
        public int SupplierId { get; set; }
        [Column(TypeName = "decimal(12,2)")]
        public decimal? UnitPrice { get; set; }
        [MaxLength(30)]
        public string? Package { get; set; }
        [Required]
        public bool IsDiscontinued { get; set; }

        [ForeignKey("SupplierId")]
        public virtual Supplier Supplier { get; set; }
    }
}

using AdminDashboard.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.Contexts
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }

        public virtual DbSet<User> User{ get; set; }
        public virtual DbSet<Customer> Customer{ get; set; }
        public virtual DbSet<Order> Order{ get; set; }
        public virtual DbSet<OrderItem> OrderItem{ get; set; }
        public virtual DbSet<Product> Product{ get; set; }
        public virtual DbSet<Supplier> Supplier{ get; set; }
    }
}

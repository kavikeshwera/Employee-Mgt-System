using Microsoft.EntityFrameworkCore;
using Emp = Employee.Api.Models.Employee;   // ALIAS — forces the class, not a namespace

namespace Employee.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Emp> Employees => Set<Emp>();  // use alias here too
    }
}

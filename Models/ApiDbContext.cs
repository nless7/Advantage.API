using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Advantage.API.Models
{
    /// <summary>
    /// Dbcontext for each entity model. This is used to interact with the database.
    /// </summary>
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {

        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Server> Servers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>()
                .Property(customer => customer.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Order>()
                .Property(order => order.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Server>()
                .Property(server => server.Id)
                .HasDefaultValueSql("NEWID()");
        }  
    }
}

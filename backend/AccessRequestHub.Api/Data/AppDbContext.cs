using Microsoft.EntityFrameworkCore;
using AccessRequestHub.Api.Models;

namespace AccessRequestHub.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<AccessRequest> AccessRequests { get; set; }
        public DbSet<AuditEvent> AuditEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<AccessRequest>()
                .HasIndex(ar => ar.ClientRequestId)
                .IsUnique();
            
        }
    }
}

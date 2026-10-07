using AccessRequestHub.Api.Models;

namespace AccessRequestHub.Api.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = serviceProvider.GetRequiredService<AppDbContext>();
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;
            }

            var bob = new User { Email = "bob@example.local", Role = "Manager" };
            var carol = new User { Email = "carol@example.local", Role = "SystemOwner" };
            var dana = new User { Email = "dana@example.local", Role = "SystemOwner" };
            var erin = new User { Email = "erin@example.local", Role = "Admin" };

            context.Users.AddRange(bob, carol, dana, erin);
            context.SaveChanges();

            var alice = new User { Email = "alice@example.local", Role = "Requester", ManagerId = bob.Id };
            context.Users.Add(alice);
            context.SaveChanges();

            var crm = new Application { Name = "CRM", SystemOwnerId = carol.Id };
            var finance = new Application { Name = "Finance Portal", SystemOwnerId = dana.Id };

            context.Applications.AddRange(crm, finance);
            context.SaveChanges();
        }
    }
}

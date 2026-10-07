using System.Security.Claims;

namespace AccessRequestHub.Api.Middleware
{
    public class SimulatedAuthMiddleware
    {
        private readonly RequestDelegate _next;

        public SimulatedAuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var emailHeader = context.Request.Headers["X-User-Email"].FirstOrDefault();
            
            if (!string.IsNullOrEmpty(emailHeader))
            {
                var claims = new[] { new Claim(ClaimTypes.Name, emailHeader) };
                var identity = new ClaimsIdentity(claims, "Simulated");
                context.User = new ClaimsPrincipal(identity);
            }

            await _next(context);
        }
    }

    public static class SimulatedAuthMiddlewareExtensions
    {
        public static IApplicationBuilder UseSimulatedAuth(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SimulatedAuthMiddleware>();
        }
    }
}

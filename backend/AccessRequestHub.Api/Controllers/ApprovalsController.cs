using AccessRequestHub.Api.Dtos;
using AccessRequestHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AccessRequestHub.Api.Controllers
{
    [ApiController]
    [Route("api/approvals")]
    public class ApprovalsController : ControllerBase
    {
        private readonly AccessRequestService _service;

        public ApprovalsController(AccessRequestService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetPendingApprovals()
        {
            var email = User.Identity?.Name;
            if (string.IsNullOrEmpty(email)) return Unauthorized();

            var user = await _service.GetUserByEmailAsync(email);
            if (user == null) return Unauthorized();

            var requests = await _service.GetPendingApprovalsAsync(user);
            var dtos = requests.Select(AccessRequestResponseDto.FromEntity).ToList();

            return Ok(dtos);
        }
    }
}

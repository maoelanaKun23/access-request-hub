using AccessRequestHub.Api.Dtos;
using AccessRequestHub.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AccessRequestHub.Api.Controllers
{
    [ApiController]
    [Route("api/access-requests")]
    public class AccessRequestsController : ControllerBase
    {
        private readonly AccessRequestService _service;

        public AccessRequestsController(AccessRequestService service)
        {
            _service = service;
        }

        private async Task<Models.User?> GetCurrentUserAsync()
        {
            var email = User.Identity?.Name;
            if (string.IsNullOrEmpty(email)) return null;
            return await _service.GetUserByEmailAsync(email);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody] CreateAccessRequestDto dto)
        {
            var user = await GetCurrentUserAsync();
            if (user == null) return Unauthorized();

            var (success, request, error) = await _service.CreateRequestAsync(dto, user);
            
            if (!success)
            {
                if (error == "Application not found") return BadRequest(new { error });
                return Conflict(new { error });
            }

            return CreatedAtAction(nameof(GetRequestById), new { id = request!.Id }, AccessRequestResponseDto.FromEntity(request));
        }

        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var user = await GetCurrentUserAsync();
            if (user == null) return Unauthorized();

            var requests = await _service.GetRequestsForUserAsync(user);
            var dtos = requests.Select(AccessRequestResponseDto.FromEntity).ToList();
            
            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequestById(int id)
        {
            var user = await GetCurrentUserAsync();
            if (user == null) return Unauthorized();

            var request = await _service.GetRequestByIdAsync(id, user);
            if (request == null)
            {
                return NotFound();
            }

            var dto = AccessRequestResponseDto.FromEntity(request);
            
            return Ok(new { 
                Request = dto, 
                AuditTrail = request.AuditTrail.Select(AuditEventResponseDto.FromEntity).OrderByDescending(a => a.Timestamp).ToList() 
            });
        }

        [HttpPost("{id}/approve")]
        public async Task<IActionResult> ApproveRequest(int id)
        {
            var user = await GetCurrentUserAsync();
            if (user == null) return Unauthorized();

            var (success, error) = await _service.ApproveRequestAsync(id, user);

            if (!success)
            {
                if (error == "Not Found") return NotFound();
                if (error.StartsWith("Forbidden")) return StatusCode(403, new { error });
                if (error.StartsWith("Conflict")) return Conflict(new { error });
                return BadRequest(new { error });
            }

            return Ok();
        }

        [HttpPost("{id}/reject")]
        public async Task<IActionResult> RejectRequest(int id, [FromBody] RejectRequestDto dto)
        {
            var user = await GetCurrentUserAsync();
            if (user == null) return Unauthorized();

            if (string.IsNullOrWhiteSpace(dto.Reason))
                return BadRequest(new { error = "Reason is required for rejection." });

            var (success, error) = await _service.RejectRequestAsync(id, user, dto.Reason);

            if (!success)
            {
                if (error == "Not Found") return NotFound();
                if (error.StartsWith("Forbidden")) return StatusCode(403, new { error });
                if (error.StartsWith("Conflict")) return Conflict(new { error });
                return BadRequest(new { error });
            }

            return Ok();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Advantage.API.Models;
using Advantage.API.Message;

namespace Advantage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServerController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public ServerController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Server
        [HttpGet]
        public IEnumerable<Server> GetServers()
        {
            return _context.Servers;
        }

        // GET: api/Server/GetServer/5
        [HttpGet("{id}", Name="GetServer")]
        public async Task<IActionResult> GetServer([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var server = await _context.Servers.FindAsync(id);

            if (server == null)
            {
                return NotFound();
            }

            return Ok(server);
        }

        // PUT: api/Server/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutServer([FromRoute] Guid id, [FromBody] Server server)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != server.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(server).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ServerExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPut("Message/{id}", Name ="Message")]
        public async Task<IActionResult> Message(Guid id, [FromBody] ServerMessage serverMessage)
        {
            var server = _context.Servers.Find(id);

            if (server == null)
            {
                return NotFound();
            }

            //Todo Refactor: move into a service.
            if (serverMessage.Payload == "activate")
            {
                server.IsOnline = true;
                await _context.SaveChangesAsync();
            }

            if (serverMessage.Payload == "deactivate")
            {
                server.IsOnline = false;
                await _context.SaveChangesAsync();
            }

            return new NoContentResult();
        }
        
        // POST: api/Server
        [HttpPost]
        public async Task<IActionResult> PostServer([FromBody] Server server)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Servers.Add(server);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServer", new { id = server.Id }, server);
        }

        // DELETE: api/Server/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServer([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var server = await _context.Servers.FindAsync(id);
            if (server == null)
            {
                return NotFound();
            }

            _context.Servers.Remove(server);
            await _context.SaveChangesAsync();

            return Ok(server);
        }

        private bool ServerExists(Guid id)
        {
            return _context.Servers.Any(e => e.Id == id);
        }
    }
}
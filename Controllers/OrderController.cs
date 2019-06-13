using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Advantage.API.Models;
using Advantage.API.Helpers;

namespace Advantage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public OrderController(ApiDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all orders.
        /// </summary>
        /// <returns>The orders.</returns>
        // GET: api/Order
        [HttpGet]
        public IEnumerable<Order> GetOrders()
        {
            return _context.Orders;
        }

        /// <summary>
        /// Get orders by Id.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The order.</returns>
        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // var order = await _context.Orders.FindAsync(id);

            var order = await _context.Orders.Include(o => o.Customer)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        /// <summary>
        /// Get all orders by page index and page size.
        /// </summary>
        /// <param name="pageIndex">The page index.</param>
        /// <param name="pageSize">The page size.</param>
        /// <returns>The orders.</returns>
        // Get: api/order/GetAllOrders/pageNumber/pageSize
        [HttpGet("{pageIndex:int}/{pageSize:int}", Name = "GetAllOrders")]
        public async Task<IActionResult> GetAllOrders(int pageIndex, int pageSize)
        {
            //Get orders include customers and sort by orders placed.
            var data = _context.Orders
                .Include(order => order.Customer)
                .OrderByDescending(order => order.Placed);

            //Paginate the data.
            var page = new PaginatedResponse<Order>(data, pageIndex, pageSize);

            var totalCount = await data.CountAsync();
            var totalPages = Math.Ceiling((double)totalCount / pageSize);

            var response = new
            {
                Page = page,
                TotalPages = totalPages
            };

            return Ok(response);
        }

        /// <summary>
        /// Get all orders grouped by postcode.
        /// </summary>
        /// <returns>The orders.</returns>
        [HttpGet("ByPostcode")]
        public async Task<IActionResult> ByPostcode()
        {
            //Filter orders.
            var orders = await _context.Orders
                .Include(order => order.Customer)
                .ToListAsync();

            //Group by postcode. 
            //Descending list of postcodes and total number of orders for each of those postcodes.
            var groupedResult = orders.GroupBy(order => order.Customer.PostCode)
                .ToList()
                .Select(group => new
                {
                    PostCode = group.Key,
                    Total = group.Sum(x => x.Total)
                }).OrderByDescending(result => result.Total)
                .ToList();

            return Ok(groupedResult);
        }

        /// <summary>
        /// Get orders by number of customers.
        /// </summary>
        /// <param name="numberOfCustomers">The number of customers.</param>
        /// <returns>The orders.</returns>
        [HttpGet("ByCustomer/{numberOfCustomers}")]
        public async Task<IActionResult> GetOrderByCustomer(int numberOfCustomers)
        {
            //Filter orders.
            var orders = await _context.Orders
                .Include(order => order.Customer).ToListAsync();

            //Group by postcode. 
            //Descending list of postcodes and total number of orders for each of those postcodes.
            var groupedResult = orders.GroupBy(order => order.Customer.Id)
                .ToList()
                .Select(group => new
                {
                    FirstName = _context.Customers.Find(group.Key).FirstName,
                    Total = group.Sum(x => x.Total)
                }).OrderByDescending(result => result.Total)
                .Take(numberOfCustomers)
                .ToList();

            return Ok(groupedResult);
        }

        /// <summary>
        /// Update order by id.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="order">The order.</param>
        /// <returns>The order.</returns>
        // PUT: api/Order/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder([FromRoute] Guid id, [FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Save an order.
        /// </summary>
        /// <param name="order">The order.</param>
        /// <returns>The order.</returns>
        // POST: api/Order
        [HttpPost]
        public async Task<IActionResult> PostOrder([FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        /// <summary>
        /// Delete order by id.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The order.</returns>
        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }

        /// <summary>
        /// Check if the order exist.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>True or false.</returns>
        private bool OrderExists(Guid id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
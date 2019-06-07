using Advantage.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Advantage.API.Models
{
    /// <summary>
    /// Seed the database with some sample data.
    /// </summary>
    public class DataSeed
    {
        private readonly ApiDbContext _ctx;
        private int? randCustomer = null;
        private static Random rand = new Random();

        public DataSeed(ApiDbContext ctx)
        {
            _ctx = ctx;
        }

        /// <summary>
        /// The order of the data seeds matter because there needs 
        /// to be customers in the database before orders can be made.
        /// </summary>
        /// <param name="nCustomers">The customers.</param>
        /// <param name="nOrders">The orders</param>
        public void SeedData(int nCustomers, int nOrders)
        {
            if (!_ctx.Customers.Any())
            {
                SeedCustomers(nCustomers);
                _ctx.SaveChanges();
            }

            if (!_ctx.Orders.Any())
            {
                SeedOrders(nOrders);
                _ctx.SaveChanges();
            }

            if (!_ctx.Servers.Any())
            {
                SeedServers();
                _ctx.SaveChanges();
            }
        }

        /// <summary>
        /// The number of Server(s).
        /// </summary>
        private void SeedServers()
        {
            List<Server> servers = BuildServerList();

            foreach (var server in servers)
            {
                _ctx.Servers.Add(server);
            }
        }

        /// <summary>
        /// Create server list dummy data.
        /// </summary>
        /// <returns>The server list.</returns>
        private List<Server> BuildServerList()
        {
            return new List<Server>()
            {
                new Server
                {
                    Name = "Dev-Web",
                    IsOnline = true
                },
                new Server
                {
                    Name = "Dev-Mail",
                    IsOnline = false
                },
                new Server
                {
                    Name = "Dev-Services",
                    IsOnline = true
                },
                new Server
                {
                    Name = "QA-Web",
                    IsOnline = true
                },
                new Server
                {
                    Name = "QA-Mail",
                    IsOnline = false
                },
                new Server
                {
                    Name = "QA-Services",
                    IsOnline = true
                },
                new Server
                {
                    Name = "Prod-Web",
                    IsOnline = true
                },
                new Server
                {
                    Name = "Prod-Mail",
                    IsOnline = false
                },
                new Server
                {
                    Name = "Prod-Services",
                    IsOnline = true
                }
            };
        }

        /// <summary>
        /// Create Order data.
        /// </summary>
        /// <param name="nOrders">The number of Order(s).</param>
        private void SeedOrders(int nOrders)
        {
            List<Order> orders = BuildOrderList(nOrders);

            foreach (var order in orders)
            {
                _ctx.Orders.Add(order);
            }
        }

        /// <summary>
        /// Build the Orders list.
        /// </summary>
        /// <param name="nOrders">The number of order(s).</param>
        /// <returns>The order.</returns>
        private List<Order> BuildOrderList(int nOrders)
        {
            var orders = new List<Order>();

            for (int i = 1; i < nOrders; i++)
            {
                var placed = Functions.GetRandomOrderPlaced();
                var completed = Functions.GetRandomOrderCompleted(placed);

                orders.Add(new Order
                {
                    Customer = GetRandomCustomer(),
                    Total = Functions.GetRandomOrderTotal(),
                    Placed = placed,
                    Completed = completed
                });
            }

            return orders;
        }

        /// <summary>
        /// Create Customer data.
        /// </summary>
        /// <param name="nCustomers">The number of customer(s).</param>
        private void SeedCustomers(int nCustomers)
        {
            List<Customer> customers = BuildCustomerList(nCustomers);

            foreach (var customer in customers)
            {
                _ctx.Customers.Add(customer);
            }
        }

        /// <summary>
        /// Build the Customer list.
        /// </summary>
        /// <param name="nCustomers">The number of customer(s).</param>
        /// <returns>The customer.</returns>
        private List<Customer> BuildCustomerList(int nCustomers)
        {
            var customers = new List<Customer>();
            var names = new List<string>();

            for (int i = 1; i <= nCustomers; i++)
            {
                var fullName = Functions.MakeUniqueCustomerName(names);
                names.Add(fullName);

                customers.Add(new Customer
                {
                    FirstName = Functions.GetFirstName(fullName),
                    LastName = Functions.GetFLastName(fullName),
                    Email = Functions.MakeCustomerEmail(fullName),
                    PostCode = Functions.GetRandomPostCode()
                });
            }

            return customers;
        }

        /// <summary>
        /// Get a random customer from the database.
        /// </summary>
        /// <returns>The customer.</returns>
        private Customer GetRandomCustomer()
        {
            var customer = new Customer();
            randCustomer = rand.Next(_ctx.Customers.Count());
            customer = _ctx.Customers
                .Skip(randCustomer.Value)
                .FirstOrDefault();

            return customer;
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Advantage.API.Models
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }

        public Guid? CustomerId { get; set; }

        public Customer Customer { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Total { get; set; }

        public DateTime Placed { get; set; }

        public DateTime? Completed { get; set; }
    }
}

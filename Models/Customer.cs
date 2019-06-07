using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Advantage.API.Models
{
    public class Customer
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FirstName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string LastName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(254)")]
        public string Email { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(10)")]
        public string PostCode { get; set; }
    }
}
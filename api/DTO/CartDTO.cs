using System.Collections.Generic;

namespace api.DTO
{
    public class CartDto
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public List<CartItemDto> CartItems { get; set; } 
    }
}
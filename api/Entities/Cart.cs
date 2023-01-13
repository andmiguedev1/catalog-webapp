using System.Collections.Generic;
using System.Linq;

namespace api.Entities
{
   public class Cart
   {
      public int Id { get; set; }
      public string CustomerId { get; set; }
      public List<CartItem> CartItems { get; set; } = new List<CartItem>();

      public void AddCartItem(Product product, int quantity)
      {
         if (CartItems.All(customerItem => customerItem.ProductId != product.Id))
         {
            CartItems.Add(new CartItem
            {
               Product = product,
               Quantity = quantity
            });
         }

         var currentCart = CartItems.FirstOrDefault(cartItem => cartItem.ProductId == product.Id);

         if (currentCart != null)
         {
            currentCart.Quantity += quantity;
         }
      }

      public void RemoveCartItem(int productId, int quantity)
      {
         var currentCart = CartItems.FirstOrDefault(cartItem => cartItem.ProductId == productId);

         if (currentCart == null) return;

         currentCart.Quantity -= quantity;
      }
   }
}
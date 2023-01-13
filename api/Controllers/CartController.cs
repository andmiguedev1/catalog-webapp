using System.Threading.Tasks;
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
   public class CartController : RootController
   {
      private readonly StoreContext _context;
      public CartController(StoreContext context)
      {
         this._context = context;

      }

      [HttpGet]
      public async Task<ActionResult<Cart>> GetShoppingCart()
      {
         var shoppingCart = await _context.Carts
             // Access cart items inside shopping cart
             .Include(customerItem => customerItem.CartItems)
             // Access each product inside shopping cart  
             .ThenInclude(selection => selection.Product)
             // For every request and response a cookies is sent
             // from server to client in order to identify cart
             .FirstOrDefaultAsync(shoppingItems => shoppingItems.CustomerId == Request.Cookies["clientId"]);

         // Check for existing cart 
         if (shoppingCart == null)
         {
            return NotFound();
         };

         return shoppingCart;
      }
   }
}
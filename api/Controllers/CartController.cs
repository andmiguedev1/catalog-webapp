using System;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Http;
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
         var shoppingCart = await GetShoppingItems();

         // Check for existing cart 
         if (shoppingCart == null)
         {
            return NotFound();
         };

         return shoppingCart;
      }

      [HttpPost]
      // api/cart?productId=5&quantity=4
      public async Task<ActionResult> AddShoppingItemsToCart(int productId, int quantity)
      {
         // Access existing customer's items stored
         var customerCart = await GetShoppingItems();

         // Create a new shopping cart if there are
         // no items stored
         if (customerCart == null)
         {
            customerCart = CreateShoppingCart();
         }

         // Access customer product that matches product's inventory
         var chosenProduct = await _context.Products.FindAsync(productId);

         // A valid product must exists
         if (chosenProduct == null)
         {
            return NotFound();
         }

         // Set reference to customer items and number of 
         // products in cart
         customerCart.AddCartItem(chosenProduct, quantity);

         // Update database with added items to cart
         var storeProcedure = await _context.SaveChangesAsync();

         // customer's request was successfull
         if (storeProcedure > 0)
         {
            return StatusCode(201);
         }

         // Notify customer there was a problem in current request 
         return BadRequest(new ProblemDetails { Title = "Oops! There was a problem adding items to your cart. Try again" });
      }

      private Cart CreateShoppingCart()
      {
         // Identity each customer with a temporary
         // cookie that has an expiration date
         var customerId = Guid.NewGuid().ToString();
         var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(5) };

         // Set response with the customer identifier
         // and attach it to the cookie client id  
         Response.Cookies.Append("clientId", customerId, cookieOptions);
         var shoppingCart = new Cart { CustomerId = customerId };

         // Add current items to customer's cart
         _context.Carts.Add(shoppingCart);

         return shoppingCart;
      }

      private async Task<Cart> GetShoppingItems()
      {
         return await _context.Carts
             // Access cart items inside shopping cart
             .Include(customerItem => customerItem.CartItems)
             // Access each product inside shopping cart  
             .ThenInclude(selection => selection.Product)
             // For every request and response a cookies is sent
             // from server to client in order to identify cart
             .FirstOrDefaultAsync(shoppingItems => shoppingItems.CustomerId == Request.Cookies["clientId"]);
      }
   }
}
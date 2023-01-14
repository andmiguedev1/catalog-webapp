using System;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO;
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

      [HttpGet(Name = "GetShoppingCart")]
      public async Task<ActionResult<CartDto>> GetShoppingCart()
      {
         var shoppingCart = await GetShoppingItems();

         // Check for existing cart 
         if (shoppingCart == null)
         {
            return NotFound();
         };

         // Set the structure return by the API
         // using Data Transfer Objects 
         return MapCartItemsToDto(shoppingCart);
      }

      [HttpPost]
      // api/cart?productId=5&quantity=4
      public async Task<ActionResult<CartDto>> AddShoppingItemsToCart(int productId, int quantity)
      {
         // Access existing shopping cart's items
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
         var storeProcedure = await _context.SaveChangesAsync();

         if (storeProcedure > 0)
         {
            // Create a resource for shopping cart in the server,
            // and add location's header in the response
            return CreatedAtRoute("GetShoppingCart", MapCartItemsToDto(customerCart));
         }

         // Notify customer there was a problem in Post request 
         return BadRequest(new ProblemDetails { Title = "Oops! Unable to add items to your cart. Try again" });
      }

      [HttpDelete]
      public async Task<ActionResult> RemoveShoppingItemsInCart(int productId, int quantity)
      {
         // Access existing shopping cart's items
         var customerCart = await GetShoppingItems();

         if (customerCart == null)
         {
            return NotFound();
         }

         // Remove selected product based on number of items
         // than is less than existing quantity
         customerCart.RemoveCartItem(productId, quantity);
         var storeProcedure = await _context.SaveChangesAsync();

         if (storeProcedure > 0)
         {
            return Ok();
         }

         // Notify customer there was a problem with Delete request
         return BadRequest(new ProblemDetails { Title = "Oops! Unable to remove items in your cart. Try again" });
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

      private CartDto MapCartItemsToDto(Cart shoppingCart)
      {
         return new CartDto
         {
            Id = shoppingCart.Id,
            CustomerId = shoppingCart.CustomerId,
            CartItems = shoppingCart.CartItems.Select(cartItem => new CartItemDto
            {
               ProductId = cartItem.ProductId,
               Name = cartItem.Product.Name,
               Image = cartItem.Product.Image,
               Brand = cartItem.Product.Brand,
               Type = cartItem.Product.Type,
               Price = cartItem.Product.Price,
               Quantity = cartItem.Quantity
            }).ToList()
         };
      }
   }
}
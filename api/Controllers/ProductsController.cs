using System.Collections.Generic;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{

   public class ProductsController : RootController
   {
      private readonly StoreContext _context;
      public ProductsController(StoreContext context)
      {
         this._context = context;
      }

      [HttpGet]
      // api/products
      public async Task<ActionResult<List<Product>>> GetProducts()
      {
         // Return all products asynchronously
         return await _context.Products.ToListAsync();
      }

      [HttpGet("{id}")]
      // api/products/1
      public async Task<ActionResult<Product>> GetProduct(int id)
      {

         // Find a single product asynchronously
         var singleProduct = await _context.Products.FindAsync(id);

         // Prevents a 204 Server Response if an
         // invalid product id is
         if (singleProduct == null)
         {
            return NotFound();
         }

         return singleProduct;
      }
   }
}
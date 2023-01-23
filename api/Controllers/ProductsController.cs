using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using api.Extensions;
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
      public async Task<ActionResult<List<Product>>> GetProducts(string orderBy, string searchBy, string brands, string types)
      {
         // Perform sorting and searching of products 
         var productsQuery = _context.Products.SortProducts(orderBy).SearchProducts(searchBy).FilterByCategories(brands, types).AsQueryable();

         // Return all products asynchronously
         return await productsQuery.ToListAsync();
      }

      [HttpGet("{id}")]
      // api/products/1
      public async Task<ActionResult<Product>> GetProduct(int id)
      {

         // Find a single product asynchronously
         var singleProduct = await _context.Products.FindAsync(id);

         // Prevents a 204 Server Response if an
         // invalid product id is passed
         if (singleProduct == null)
         {
            return NotFound();
         }

         return singleProduct;
      }
   }
}
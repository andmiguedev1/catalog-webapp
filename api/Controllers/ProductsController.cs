using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using api.Extensions;
using api.Helpers;
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
      public async Task<ActionResult<PagesList<Product>>> GetProducts([FromQuery] ProductsParams storeParams)
      {
         // Find products using several categories 
         var productsQuery = _context.Products
            .SortProducts(storeParams.OrderBy)
            .SearchProducts(storeParams.SearchWord)
            .FilterByCategories(storeParams.Brands, storeParams.Types).AsQueryable();

         // Divide products using pagination parameters
         var productsList = await PagesList<Product>.PaginatePages(productsQuery, storeParams.PageNumber, storeParams.PageSize);
         // Display a list of products for each page
         Response.Headers.Add("Pagination", JsonSerializer.Serialize(productsList.Pages));

         return productsList;
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
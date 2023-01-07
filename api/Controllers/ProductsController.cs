using System.Collections.Generic;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
   [ApiController]
   [Route("api/[controller]")]
   public class ProductsController : ControllerBase
   {
      private readonly StoreContext _context;
      public ProductsController(StoreContext context)
      {
         this._context = context;
      }

      [HttpGet]
      // api/Products
      public async Task<ActionResult<List<Product>>> GetProducts()
      {
         // Return all products asynchronously
         return await _context.Products.ToListAsync();
      }

      [HttpGet("{id}")]
      // api/Products/1
      public async Task<ActionResult<Product>> GetProduct(int id)
      {
         // Return single product asynchronously
         return await _context.Products.FindAsync(id);
      }
   }
}
using System.Collections.Generic;
using System.Linq;
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Mvc;

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
      public ActionResult<List<Product>> GetProducts()
      {
         var products = _context.Products.ToList();
         return Ok(products);
      }

      [HttpGet("{id}")]
      public ActionResult<Product> GetProduct(int id)
      {
         return _context.Products.Find(id);
      }
   }
}
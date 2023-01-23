using System.Linq;
using api.Entities;

namespace api.Extensions
{
   public static class ProductsExtension
   {
      public static IQueryable<Product> SortProducts(this IQueryable<Product> query, string orderBy)
      {
         // Set default order of products by name
         if (string.IsNullOrWhiteSpace(orderBy))
            return query.OrderBy(product => product.Name);

         // Order products by specific query
         query = orderBy switch
         {
            "priceAsc" => query.OrderBy(product => product.Price),
            "priceDesc" => query.OrderByDescending(product => product.Price),
            _ => query.OrderBy(product => product.Name)
         };

         return query;
      }
   }
}
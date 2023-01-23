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

      public static IQueryable<Product> SearchProducts(this IQueryable<Product> query, string keyword)
      {
         // Do not search if there is a blank
         // parameter
         if (string.IsNullOrEmpty(keyword))
            return query;

         // Make customer's search keyword readable
         var searchTerm = keyword.Trim().ToLower();

         // Compare result by searching product's name with search keyword
         return query.Where(product => product.Name.ToLower().Contains(searchTerm));
      }
   }
}
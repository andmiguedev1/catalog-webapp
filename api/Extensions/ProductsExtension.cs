using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

      public static IQueryable<Product> FilterByCategories(this IQueryable<Product> query, string brands, string types)
      {
         // Create a list of different brands and
         // types inside a product
         var storeBrandLists = new List<string>();
         var storeTypeLists = new List<string>();

         // Allows to pass more than one category,
         // such as, brand1, brand2, type, etc
         GetCategories(brands, storeBrandLists);
         GetCategories(types, storeTypeLists);

         // Check there is not pending filter query,
         // then find categories that are in lists
         query = query.Where(product => storeBrandLists.Count == 0 || storeBrandLists.Contains(product.Brand.ToLower()));
         query = query.Where(product => storeTypeLists.Count == 0 || storeTypeLists.Contains(product.Type.ToLower()));

         return query;
      }

      private static void GetCategories(string category, List<string> categoryList)
      {
         if (!string.IsNullOrEmpty(category))
            categoryList.AddRange(category.ToLower().Split(",").ToList());
      }
   }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Helpers
{
   public class PagesList<T> : List<T>
   {
      // Constructor that defines properties of pages list
      public PagesList(List<T> itemsList, int totalCount, int pageNumber, int pageSize)
      {
         Pages = new Pages
         {
            TotalCount = totalCount,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
         };

         AddRange(itemsList);
      }

      // Initialize properties for pagination
      public Pages Pages { get; set; }

      public static async Task<PagesList<T>> PaginatePages(IQueryable<T> query, int pageNumber, int pageSize)
      {
         // Set counter for pages to be displayed
         var countList = await query.CountAsync();
         // Calculate the number of products to display
         // on each page
         var itemsList = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

         return new PagesList<T>(itemsList, countList, pageNumber, pageSize);
      }
   }
}
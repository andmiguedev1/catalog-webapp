using System.Text.Json;
using api.Entities;
using Microsoft.AspNetCore.Http;

public static class HeaderExtensions
{
   public static void SetPaginationHeader(this HttpResponse response, Pages pagesMetadata)
   {
      var networkResponse = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
      // Parse pages metadata in network requests
      response.Headers.Add("Pagination", JsonSerializer.Serialize(pagesMetadata, networkResponse));
      // Allow network requests to accept pagination
      response.Headers.Add("Access-Content-Expose-Headers", "Pagination");
   }
}
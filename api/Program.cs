using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace api
{
   public class Program
   {
      public static void Main(string[] args)
      {
         // Setup resources for Preloading
         var host = CreateHostBuilder(args).Build();
         var scope = host.Services.CreateScope();
         var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
         var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
         // Start server with swagger api
         CreateHostBuilder(args).Build().Run();

         try
         {
            // Build database after building project 
            context.Database.Migrate();
            PopulateData.Initialize(context);

         }
         catch (Exception excp)
         {
            logger.LogError(excp, "An error has occurred! Unable to make a migration.");
         }
         finally
         {
            // Handles unused resources
            scope.Dispose();
         }
      }

      public static IHostBuilder CreateHostBuilder(string[] args) =>
          Host.CreateDefaultBuilder(args)
              .ConfigureWebHostDefaults(webBuilder =>
              {
                 webBuilder.UseStartup<Startup>();
              });
   }
}

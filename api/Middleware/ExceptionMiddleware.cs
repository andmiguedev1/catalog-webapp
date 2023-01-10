using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace api.Middleware
{
   public class ExceptionMiddleware
   {
      private readonly RequestDelegate _next;
      private readonly ILogger<ExceptionMiddleware> _logger;
      private readonly IHostEnvironment _env;

      public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
      {
         this._env = env;
         this._logger = logger;
         this._next = next;

      }

      public async Task InvokeAsync(HttpContext context)
      {
         try
         {
            await _next(context);
         }
         catch (Exception exc)
         {
            _logger.LogError(exc, exc.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;

            var exceptionResponse = new ProblemDetails
            {
               Status = 500,
               Detail = _env.IsDevelopment() ? exc.StackTrace?.ToString() : null,
               Title = exc.Message
            };

            var policyOptions = new JsonSerializerOptions
            {
               PropertyNamingPolicy =
                JsonNamingPolicy.CamelCase
            };

            var jsonResponse = JsonSerializer.Serialize(exceptionResponse, policyOptions);
            await context.Response.WriteAsync(jsonResponse);
         }
      }
   }
}
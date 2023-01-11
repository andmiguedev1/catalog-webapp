using System;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
   public class ErrorController : RootController
   {
      [HttpGet("not-found")]
      public ActionResult NotFoundError()
      {
         return NotFound();
      }

      [HttpGet("bad-request")]
      public ActionResult GetBadRequestError()
      {
         return BadRequest(new ProblemDetails { Title = "Bad Request! The server cannot process request at this time." });
      }

      [HttpGet("unauthorized")]
      public ActionResult GetUnauthorizedError()
      {
         return Unauthorized(new ProblemDetails { Title = "Unauthorized Access! You need valid credentials to see this page" });
      }

      [HttpGet("validation-error")]
      public ActionResult GetValidationError()
      {
         ModelState.AddModelError("Problem", "This is the first error");
         return ValidationProblem();
      }

      [HttpGet("server-error")]
      public ActionResult GetServerError()
      {

         throw new Exception("Server Error. Check error code and contact support at this time.");
      }
   }
}
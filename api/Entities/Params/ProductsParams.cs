namespace api.Entities
{
   public class ProductsParams : PaginationParams
   {
      public string OrderBy { get; set; }

      public string SearchWord { get; set; }

      public string Types { get; set; }

      public string Brands { get; set; }
   }
}
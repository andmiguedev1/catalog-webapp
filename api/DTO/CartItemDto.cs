namespace api.DTO
{
   public class CartItemDto
   {
      public int ProductId { get; set; }
      public string Name { get; set; }
      public string Image { get; set; }
      public string Brand { get; set; }
      public string Type { get; set; }
      public long Price { get; set; }
      public int Quantity { get; set; }

   }
}
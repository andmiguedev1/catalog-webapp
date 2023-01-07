using System.Collections.Generic;
using System.Linq;
using api.Entities;

namespace api.Data
{
   public static class PopulateData
   {
      public static void Initialize(StoreContext context)
      {
         // Do not populate if products already exist
         if (context.Products.Any()) return;

         var sampleProducts = new List<Product>
         {
             new Product
             {
                Name = "Litchi Embossed Card Holder",
                Image = "https://i.imgur.com/hvWAMCu.jpg",
                Brand = "Kaiduch Bags",
                Type = "Accessories",
                Price = 4,
                Quantity = 100
            },
            new Product
            {
                Name = "Button Decor Zipper Wallet",
                Image = "https://i.imgur.com/zgsLmKs.jpg",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 6,
                Quantity = 100,
             },
             new Product
             {
                Name = "Solid Beanie",
                Image = "https://i.imgur.com/KTFHV9Y.jpg",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 10,
                Quantity = 100
             },
             new Product
             {
                Name = "Square Electronic Watch",
                Image = "https://i.imgur.com/PQHGcus.jpg",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 38,
                Quantity = 100
             },
             new Product
             {
                Name = "Earphone Hole Sling Bag",
                Image = "https://i.imgur.com/IQTcOar.jpg",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 32,
                Quantity = 100
             },
             new Product
             {
                Name = "Minimalistic Backpack Set",
                Image = "https://i.imgur.com/VJ0YSzE.jpg",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 25,
                Quantity = 100
             },
             new Product
             {
                Name = "Stainless Steel Ring",
                Image = "https://imgur.com/a/y6CQg5J",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 17,
                Quantity = 100
             },
             new Product
             {
                Name = "Letter Embossed Card Holder",
                Image = "https://i.imgur.com/KtHlXRg.jpg",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 7,
                Quantity = 100
             },
             new Product
             {
                Name = "Two Tone Geometric Key Chain",
                Image = "https://i.imgur.com/6Y8erC5.jpg",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 3,
                Quantity = 100
             },
             new Product
             {
                Name = "Minimalistic Card Holder",
                Image = "https://i.imgur.com/HQ0iKyo.jpg",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 10,
                Quantity = 100
             },
             new Product
             {
                Name = "Round Pointer Quartz Watch",
                Image = "https://i.imgur.com/SrHyk0J.jpg",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 45,
                Quantity = 100
             },
             new Product
             {
                Name = "Minimalistic Bracelet Set",
                Image = "https://i.imgur.com/8ZPK0zf.jpg",
                Brand = "Unknown",
                Type = "Accessories",
                Price = 20,
                Quantity = 100
             }
         };

         // Insert each product into database
         foreach (var product in sampleProducts)
         {
            context.Products.Add(product);
         }

         context.SaveChanges();
      }
   }
}
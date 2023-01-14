export interface CartItem {
   quantity: number;
   productId: number;
   name: string;
   image: string;
   brand: string;
   type: string;
   price: number;
}

export interface Cart {
   id: number;
   customerId: string;
   cartItems: CartItem[]; 
}
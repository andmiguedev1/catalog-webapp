import { Cart } from "../models/cart"

export function updateCartQuantity(cart: Cart | null): number {
   if (cart === null) return 0
   
   return cart.cartItems.reduce((itemsAdded, cartItem) => itemsAdded + cartItem.quantity, 0) 
}

export function getBrowserCookie(key: string) {
   const extractCookie = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")
   return extractCookie ? extractCookie.pop() : ""
}
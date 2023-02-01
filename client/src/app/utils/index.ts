import { Cart } from "../models/cart"

export function getTotalPages(currentPage: number, pageSize: number, totalCount: number) {
   if (currentPage * pageSize > totalCount) {
      return totalCount
   }

   return currentPage * pageSize
}

export function getCurrentPage(pageNumber: number, pageSize: number) {
   return (pageNumber - 1) * pageSize + 1
}

export function getSubtotalCost(cart: Cart | null): number {
   return cart?.cartItems.reduce((itemCost, customerItem) => itemCost + (customerItem.quantity * customerItem.price), 0) ?? 0
}

export function updateCartQuantity(cart: Cart | null) {
   return cart?.cartItems.reduce((itemsAdded, cartItem) => itemsAdded + cartItem.quantity, 0) 
}

export function setCurrencyFormat(amount: number) {
   return `$ ${amount.toFixed(2)}`
}

export function getBrowserCookie(key: string) {
   const extractCookie = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")
   return extractCookie ? extractCookie.pop() : ""
}


import { createSlice } from '@reduxjs/toolkit'
import { Cart } from '../../models/cart'

interface CartState {
   cart: Cart | null
}

const initialState: CartState = {
   cart: null
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      setCartItem: (state, action) => {
         state.cart = action.payload
      },
      removeCartItem: (state, action) => {
         const { productId, quantity } = action.payload
         // Find location of selected product in the cart
         const cartItemIndex = state.cart?.cartItems.findIndex(cartProduct => cartProduct.productId === productId)
         // Do not perform any action if the product is not found
         if (cartItemIndex === -1 || cartItemIndex === undefined)
            return
         else
            // Reduce the quantity of the selected product
            state.cart!.cartItems[cartItemIndex].quantity -= quantity
         // Remove selected product from the cart
         if (state.cart?.cartItems[cartItemIndex].quantity === 0)
            state.cart.cartItems.splice(cartItemIndex, 1)
      }
   }
})

export const { setCartItem, removeCartItem } = cartSlice.actions

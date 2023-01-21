
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from '../../api/agent'
import { Cart } from '../../models/cart'

interface CartState {
   cart: Cart | null
   status: string
}

const initialState: CartState = {
   cart: null,
   status: 'idle'
}

export const addCartItemAsync = createAsyncThunk<Cart, { productId: number, quantity?: number }>(
   'cart/addCartItemAsync', async ({ productId, quantity = 1 }) => {
      try {
         return await agent.CartRoutes.addToShoppingCart(productId, quantity)
      } catch (message) {
         console.error(message)
      }
   })

export const removeCartItemAsync = createAsyncThunk<void, { productId: number, quantity: number }>(
   'cart/removeCartItemAsync', async ({ productId, quantity = 1 }) => {
      try {
         return await agent.CartRoutes.removeFromShoppingCart(productId, quantity)
      } catch (message) {
         console.error(message)
      }
   }
)

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      setCartItem: (state, action) => {
         state.cart = action.payload
      },
   },
   extraReducers: (builder => {
      builder.addCase(addCartItemAsync.pending, (state, action) => {
         state.status = 'pendingAddItem' + action.meta.arg.productId
      })
      builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
         state.cart = action.payload
         state.status = 'idle'
      })
      builder.addCase(addCartItemAsync.rejected, (state, action) => {
         state.status = 'idle'
      })
      builder.addCase(removeCartItemAsync.pending, (state, action) => {
         state.status = 'pendingRemoveItem' + action.meta.arg.productId
      })
      builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
         const { productId, quantity } = action.meta.arg
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
         //
         state.status = 'idle'
      })
      builder.addCase(removeCartItemAsync.rejected, (state) => {
         state.status = 'idle'
      })
   })
})

export const { setCartItem } = cartSlice.actions

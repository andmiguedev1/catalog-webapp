import { addCartItemAsync, removeCartItemAsync } from './../store/reducers/cartSlice';
import { useState } from 'react' 

import agent from '../api/agent';
import { useAppDispatch } from './../store/appStore';
import { useAppSelector } from '../store/appStore';
import { setCartItem } from '../store/reducers/cartSlice';

import { useManageProduct } from './useManageProduct';

import { Cart, CartItem } from '../models/cart';
import { Product } from '../models/product';


export const useManageCart = () => {
   const dispatch = useAppDispatch()
   const { cart: shoppingCart, status: cartStatus } = useAppSelector(state => state.cart)

   const [cartQuantity, setCartQuantity] = useState(1)
   const { storeProduct } = useManageProduct()

   const updateCustomerCart = async (cartQty: number, storeProduct: Product | null, cartProduct?: CartItem | null) => {
      if (!cartProduct || cartQty < cartProduct.quantity) {
         // Increase the quantity for an existing product in
         // the cart, and update the count of quantity
         const updateQuantity = cartProduct ? cartQty - cartProduct.quantity : cartQty
         return await dispatch(addCartItemAsync({productId: storeProduct?.id!, quantity: updateQuantity}))
      }
      else {
         // Decrease the quantity of an existing product in 
         // the cart, and update the count of quantity
         const updateQuantity = cartProduct.quantity - cartQty
         return await dispatch(removeCartItemAsync({productId: storeProduct?.id!, quantity: updateQuantity}))
      }
   }

   const findProductInCart = (customerCart: Cart | null): CartItem | undefined => {
      // Search for a customer's product that matches 
      // store product
      return customerCart?.cartItems.find(customerProduct => customerProduct.productId === storeProduct?.id)
   }
   
   const fetchCustomerCart = async () => {
      try {
         const cartProducts = await agent.CartRoutes.getShoppingCart()
         return await dispatch(setCartItem(cartProducts))
      } catch (message) {
         console.error(message)
      } 
   }

   const addCustomerItem = async (productId: number) => {
      try {
         return await dispatch(addCartItemAsync({productId}))
      } catch (message) {
         console.error(message)
      }  
   }

   const removeCustomerItem = async (productId: number, quantity: number) => {
      try {
         return await dispatch(removeCartItemAsync({productId, quantity}))
      } catch (message) {
         console.error(message)
      }
   }

   return {
      shoppingCart,
      setCartQuantity,
      cartQuantity,
      fetchCustomerCart,
      addCustomerItem,
      removeCustomerItem,
      findProductInCart,
      cartStatus,
      updateCustomerCart
   }
}
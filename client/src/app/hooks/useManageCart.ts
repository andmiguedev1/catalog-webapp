import { useState } from 'react' 

import agent from '../api/agent';
import { useAppDispatch } from './../store/appStore';
import { useAppSelector } from '../store/appStore';
import { removeCartItem, setCartItem } from '../store/reducers/cartSlice';

import { useManageProduct } from './useManageProduct';

import { Cart, CartItem } from '../models/cart';
import { Product } from '../models/product';


export const useManageCart = () => {
   const dispatch = useAppDispatch()
   const { cart: shoppingCart } = useAppSelector(state => state.cart)

   const [cartQuantity, setCartQuantity] = useState(1)
   const [updateCart, setUpdateCart] = useState(false)
   const { storeProduct } = useManageProduct()

   const updateCustomerCart = async (cartQty: number, storeProduct: Product | null, cartProduct?: CartItem | null) => {
      if (!cartProduct || cartQty < cartProduct.quantity) {
         // Increase the quantity for an existing product in
         // the cart, and update the count of quantity
         const updateQuantity = cartProduct ? cartQty - cartProduct.quantity : cartQty
         const updateItem = await agent.CartRoutes.addToShoppingCart(storeProduct?.id!, updateQuantity)
         return await dispatch(setCartItem(updateItem))
      }
      else {
         // Decrease the quantity of an existing product in 
         // the cart, and update the count of quantity
         const updateQuantity = cartProduct.quantity - cartQty
         await agent.CartRoutes.removeFromShoppingCart(storeProduct?.id!, updateQuantity)
         return await dispatch(removeCartItem({productId: storeProduct?.id, quantity: updateQuantity}))
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
         const addedProduct = await agent.CartRoutes.addToShoppingCart(productId)
         return await dispatch(setCartItem(addedProduct))
      } catch (message) {
         console.error(message)
      }  
   }

   const removeCustomerItem = async (productId: number, quantity: number) => {
      try {
         await agent.CartRoutes.removeFromShoppingCart(productId, quantity)
         return await dispatch(removeCartItem({ productId, quantity}))
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
      updateCart,
      setUpdateCart,
      updateCustomerCart
   }
}
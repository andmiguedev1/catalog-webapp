import { useManageProduct } from './useManageProduct';
import { useState } from 'react' 
import agent from '../api/agent';
import { Cart, CartItem } from '../models/cart';

import { useCartContext } from '../state/context/cartContext';
import { Product } from '../models/product';

export const useManageCart = () => {
   const [cartQuantity, setCartQuantity] = useState(1)
   const { storeProduct } = useManageProduct()
   const { shoppingCart, setShoppingCart, removeCartItem } = useCartContext()

   const updateCustomerCart = async (cartQty: number, storeProduct: Product | null, cartProduct?: CartItem) => {
      if (!cartProduct || cartQty < cartProduct.quantity) {
         // Increase the quantity for an existing product in
         // the cart, and update the count of quantity
         const updateQuantity = cartProduct ? cartQty - cartProduct.quantity : cartQty
         const updateItem = await agent.CartRoutes.addToShoppingCart(storeProduct?.id!, updateQuantity)
         return await setShoppingCart(updateItem)
      }
      else {
         // Decrease the quantity of an existing product in 
         // the cart, and update the count of quantity
         // const updateQuantity = cartProduct.quantity - cartQty
         // await agent.CartRoutes.removeFromShoppingCart(storeProduct?.id!, updateQuantity)
         // return await removeCartItem(storeProduct?.id!, updateQuantity)
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
         return await setShoppingCart(cartProducts)
      } catch (message) {
         console.error(message)
      } 
   }

   const addCustomerItem = async (productId: number) => {
      try {
         const addedProduct = await agent.CartRoutes.addToShoppingCart(productId)
         return await setShoppingCart(addedProduct)
      } catch (message) {
         console.error(message)
      }  
   }

   const removeCustomerItem = async (productId: number, quantity: number) => {
      try {
         await agent.CartRoutes.removeFromShoppingCart(productId, quantity)
         return await removeCartItem(productId, quantity)
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
      updateCustomerCart
   }
}
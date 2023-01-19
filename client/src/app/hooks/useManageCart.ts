import agent from '../api/agent';

import { useCartContext } from '../state/context/cartContext';

export const useManageCart = () => {

   const { shoppingCart, setShoppingCart, removeCartItem } = useCartContext()
   
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
      fetchCustomerCart,
      addCustomerItem,
      removeCustomerItem
   }
}
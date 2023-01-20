import { useState } from 'react'

import agent from '../api/agent'

import { useAppDispatch, useAppSelector } from '../store/appStore';
import { setProductItem, setProductItems } from '../store/reducers/productsSlice';

export const useManageProduct = () => {
   const dispatch = useAppDispatch()
   const { product: storeProduct, products: storeProducts } = useAppSelector(state => state.products)
   const [loadProducts, setLoadProducts] = useState(true)

   const fetchCatalogProducts = async () => {
      try {
         setLoadProducts(true)
         const recentProducts = await agent.CatalogRoutes.getRecentProducts()
         return await dispatch(setProductItems(recentProducts))
      } catch (message) {
         console.error(message)
      } finally {
         setLoadProducts(false)
      }
   }

   const fetchCatalogProduct = async (product: string) => {
      try {
         setLoadProducts(true)
         const singleProduct = await agent.CatalogRoutes.getSingleProduct(parseInt(product))
         return await dispatch(setProductItem(singleProduct))
      } catch (message) {
         console.error(message)
      } finally {
         setLoadProducts(false)
      }
   }

   return {
      loadProducts,
      storeProduct,
      storeProducts,
      fetchCatalogProduct,
      fetchCatalogProducts
   }
}
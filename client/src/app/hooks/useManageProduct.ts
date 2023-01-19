import { useState } from 'react'

import agent from '../api/agent'

import { Product } from '../models/product'


export const useManageProduct = () => {
   const [loadProducts, setLoadProducts] = useState(true)
   const [storeProducts, setStoreProducts] = useState<Product[]>([])
   const [storeProduct, setStoreProduct] = useState<Product | null>(null)

   const fetchCatalogProducts = async () => {
      try {
         setLoadProducts(true)
         const recentProducts = await agent.CatalogRoutes.getRecentProducts()
         return await setStoreProducts(recentProducts)
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
         return await setStoreProduct(singleProduct)
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
import { useState } from 'react'
import agent from '../api/agent';
import { useAppDispatch, useAppSelector } from '../store/appStore';
import { setProductItem, setProductItems } from '../store/reducers/productsSlice';
// import { fetchProductAsync, fetchProductsAsync, productSelectors } from '../store/reducers/productsSlice';

export const useManageProduct = () => {
   // const productId: number = 1
   const dispatch = useAppDispatch()

   //const { loadProducts, status: productStatus } = useAppSelector(state => state.products)
   //const storeProducts = useAppSelector(productSelectors.selectAll)
   //const storeProduct = useAppSelector(state => productSelectors.selectById(state, productId))
   const { product: storeProduct, products: storeProducts } = useAppSelector(state => state.products)
   const [loadProducts, setLoadProducts ] = useState(false)

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
         const singleProduct = await agent.CatalogRoutes.getSingleProduct(parseInt(product))
         return await dispatch(setProductItem(singleProduct))
      } catch (message) {
         console.error(message)
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
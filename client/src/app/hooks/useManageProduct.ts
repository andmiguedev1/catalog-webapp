import { getProductFilters } from './../store/reducers/productsSlice';
import agent from '../api/agent';

import { useAppDispatch, useAppSelector } from '../store/appStore';
import { productSelectors, fetchProductsAsync } from '../store/reducers/productsSlice';
import { setProductItem } from '../store/reducers/productsSlice';

export const useManageProduct = () => {
   const dispatch = useAppDispatch()

   const { loadProducts, product: storeProduct, loadFilters } = useAppSelector(state => state.products)   
   const storeProducts = useAppSelector(productSelectors.selectAll)

   const fetchProductCategories = async () => {
      try {
         return await dispatch(getProductFilters())
      } catch (message) {
         console.warn(message)
      }
   }

   const fetchCatalogProducts = async () => {
      try {
         return await dispatch(fetchProductsAsync())
      } catch (message) {
         console.error(message)
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
      loadFilters,
      fetchCatalogProduct,
      fetchCatalogProducts,
      fetchProductCategories
   }
}
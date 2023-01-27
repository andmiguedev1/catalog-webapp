import agent from '../api/agent';

import { useAppDispatch, useAppSelector } from '../store/appStore';
import { productSelectors, fetchProductsAsync } from '../store/reducers/catalogSlice';
import { setProductItem } from '../store/reducers/catalogSlice';

export const useManageProduct = () => {
   const dispatch = useAppDispatch()

   const { loadProducts, product: storeProduct } = useAppSelector(state => state.catalog)   
   const storeProducts = useAppSelector(productSelectors.selectAll)

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
      fetchCatalogProduct,
      fetchCatalogProducts,
   }
}
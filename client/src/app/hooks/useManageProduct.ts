import agent from '../api/agent';

import { useAppDispatch, useAppSelector } from '../store/appStore';
import { setProductItem, productSelectors, fetchProductsAsync, setProductsParams } from '../store/reducers/catalogSlice';

export const useManageProduct = () => {
   const dispatch = useAppDispatch()

   const { loadProducts, product: storeProduct } = useAppSelector(state => state.catalog)   
   const storeProducts = useAppSelector(productSelectors.selectAll)

   const chooseCatalogCategories = async (category: string, checkedList: string[]) => {
      try { 
         if (category === 'brands') {
            await dispatch(setProductsParams({ productBrands: checkedList }))
         }
         if (category === 'types') {
            await dispatch(setProductsParams({ productTypes: checkedList }))
         }
      } catch (message) {
         console.warn(message)
      }
   }

   const filterCatalogProducts = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
         return await dispatch(setProductsParams({ orderBy: event.target.value}))
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
      fetchCatalogProduct,
      fetchCatalogProducts,
      filterCatalogProducts,
      chooseCatalogCategories
   }
}
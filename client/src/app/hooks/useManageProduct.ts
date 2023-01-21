import { useAppDispatch, useAppSelector } from '../store/appStore';
import { fetchProductAsync, fetchProductsAsync, productSelectors } from '../store/reducers/productsSlice';

export const useManageProduct = () => {
   const productId: number = 1
   const dispatch = useAppDispatch()

   const { loadProducts, status: productStatus } = useAppSelector(state => state.products)
   const storeProducts = useAppSelector(productSelectors.selectAll)
   const storeProduct = useAppSelector(state => productSelectors.selectById(state, productId))

   const fetchCatalogProducts = async () => {
      try {
         return await dispatch(fetchProductsAsync())
      } catch (message) {
         console.error(message)
      }
   }

   const fetchCatalogProduct = async (product: string) => {
      try {
         return await dispatch(fetchProductAsync(parseInt(product)))
      } catch (message) {
         console.error(message)
      }
   }

   return {
      loadProducts,
      storeProduct,
      storeProducts,
      productStatus,
      fetchCatalogProduct,
      fetchCatalogProducts
   }
}
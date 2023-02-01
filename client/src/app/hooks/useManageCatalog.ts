import { useState } from 'react'

import agent from '../api/agent';
import { useAppSelector, useAppDispatch } from './../store/appStore';
import { getAxiosParams, fetchCategoriesAsync, setPageNumber, setProductsMetadata, } from '../store/reducers/catalogSlice';

import { ProductFilters } from './../models/product';
import { Metadata } from './../models/pagination';

export const useManageCatalog = () => {
   const dispatch = useAppDispatch()
   const { params } = useAppSelector(state => state.catalog)
   
   const [categories, setCategories] = useState<ProductFilters>()
   const [pagination, setPagination] = useState<Metadata>()

   const fetchCatalogCategories = async () => {
      try {
         const categoriesResponse = await dispatch(fetchCategoriesAsync())
         const catalogCategories = categoriesResponse.payload
      
         if (catalogCategories) {
            await setCategories(catalogCategories)
         }
         
      } catch (message) {
         console.warn(message)
      }
   }
   
   const fetchCatalogPagination = async () => {
      const catalogParams = getAxiosParams(params)
      
      try {
         const catalogData = await agent.CatalogRoutes.getRecentProducts(catalogParams)
         const catalogMeta = await dispatch(setProductsMetadata(catalogData.pageInfo))
   
         if (catalogMeta) {
            await setPagination(catalogMeta.payload)
         }
         
      } catch (message) {
         console.warn(message)
      }
   }

    const changeCatalogPage = async (currentPage: number) => {
      try {
         await dispatch(setPageNumber({ pageNumber: currentPage}))
      } catch (message) {
         console.warn(message)
      }
   }

   return {
      categories,
      pagination,
      fetchCatalogCategories,
      fetchCatalogPagination,
      changeCatalogPage

   }
}
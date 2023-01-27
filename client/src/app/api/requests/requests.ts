import axios from 'axios'

import { ProductParams } from './../../models/product';
import { APIResponse } from '../helpers'

export const requestType = {
   get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(APIResponse),
   post: (url: string, body: {}) => axios.post(url, body).then(APIResponse),
   put: (url: string, body: {}) => axios.put(url, body).then(APIResponse),
   delete: (url: string) => axios.delete(url).then(APIResponse)
}

export function getAxiosParams(productParams: ProductParams) {
   const catalogParams = new URLSearchParams()
   
   catalogParams.append('pageNumber', productParams.pageNumber.toString())
   catalogParams.append('pageSize', productParams.pageSize.toString())
   catalogParams.append('orderBy', productParams.orderBy.toString())

   if (productParams.searchWord)
      catalogParams.append('searchWord', productParams.searchWord)
   
   if (productParams.productBrands)
      catalogParams.append('brands', productParams.productBrands.toString())
   
    if (productParams.productTypes)
      catalogParams.append('types', productParams.productTypes.toString())
   
   return catalogParams
}

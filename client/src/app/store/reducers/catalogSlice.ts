import { createEntityAdapter , createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import agent from '../../api/agent'

import { AppState } from '../appStore'
import { Product, ProductParams } from '../../models/product'
import { Metadata } from '../../models/pagination'

interface CatalogState {
   loadProducts: boolean,
   product: Product | null
   brands: Array<string>
   types: Array<string>
   loadFilters: boolean
   status: string,
   params: ProductParams,
   metadata: Metadata | null
}

const catalogAdapter = createEntityAdapter<Product>()

function getAxiosParams(productParams: ProductParams) {
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

export const fetchCategoriesAsync = createAsyncThunk(
   'catalog/fetchCategoriesAsync',
   async (_, thunkAPI) => {
      try {
         return await agent.CatalogRoutes.getProductCategories()
      } catch (message: any) {
         return thunkAPI.rejectWithValue({ error: message.data })
      }
   }
)

export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: AppState}>(
   'catalog/fetchProductsAsync', async (_, thunkAPI) => {
      const productParams = getAxiosParams(thunkAPI.getState().catalog.params)
      try {
         const recentProducts = await agent.CatalogRoutes.getRecentProducts(productParams)
         thunkAPI.dispatch(setProductsParams(recentProducts.metadata))
         return recentProducts

      } catch (message: any) {
         return thunkAPI.rejectWithValue({
            error: message.data
         })
      }
   }
)

function catalogParams() {
   return {
      pageNumber: 1,
      pageSize: 6,
      orderBy: 'name',
      brands: [],
      types: []
   }
}

export const catalogSlice = createSlice({
   name: 'catalog',
   initialState: catalogAdapter.getInitialState<CatalogState>({
      loadProducts: false,
      product: null,
      metadata: null,
      brands: [],
      types: [],
      loadFilters: false,
      params: catalogParams(),
      status: 'idle'
   }),
   reducers: {
      setProductItem: (state, action) => {
         state.product = action.payload
      },
      resetProductsParams: (state) => {
         state.params = catalogParams()
      },
      setProductsParams: (state, action) => {
         state.loadProducts = false
         state.params = {...state.params, ...action.payload, pageNumber: 1}
      },
      setProductsMetadata: (state, action) => {
         state.metadata = action.payload
      },
      resetProductsMetadata: (state) => {
         state.params = catalogParams()
      }
   },
   extraReducers: (builder => {
      builder.addCase(fetchProductsAsync.pending, (state) => {
         state.status = 'pendingFetchProducts'
      })
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
         catalogAdapter.setAll(state, action.payload)
         state.status = 'idle'
         state.loadProducts = true
      })
      builder.addCase(fetchProductsAsync.rejected, (state, action) => {
         state.status = 'idle'
      })
      builder.addCase(fetchCategoriesAsync.pending, (state) => {
         state.status = 'pendingCategoryFilters'
      })
      builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
         state.brands = action.payload.brands
         state.types = action.payload.types
         state.loadFilters = true
         state.status = 'idle'
      })
      builder.addCase(fetchCategoriesAsync.rejected, (state) => {
         state.loadFilters = false
         state.status = 'idle'
      })
   })
})

export const { setProductItem, setProductsParams, resetProductsParams } = catalogSlice.actions
export const productSelectors = catalogAdapter.getSelectors((state: AppState) => state.catalog)




import { createEntityAdapter , createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import agent from '../../api/agent'

import { AppState } from '../appStore'
import { getAxiosParams } from '../../api/requests/requests'
import { Product, ProductParams } from '../../models/product'

interface CatalogState {
   loadProducts: boolean,
   product: Product | null
   brands: Array<string>
   types: Array<string>
   loadFilters: boolean
   status: string,
   metadata: ProductParams
}

const catalogAdapter = createEntityAdapter<Product>()

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
      const productParams = getAxiosParams(thunkAPI.getState().catalog.metadata)
      try {
         return await agent.CatalogRoutes.getRecentProducts(productParams)
      } catch (message: any) {
         return thunkAPI.rejectWithValue({
            error: message.data
         })
      }
   }
)

function productsMetadata() {
   return {
      pageNumber: 1,
      pageSize: 6,
      orderBy: 'name'
   }
}

export const catalogSlice = createSlice({
   name: 'catalog',
   initialState: catalogAdapter.getInitialState<CatalogState>({
      loadProducts: false,
      product: null,
      brands: [],
      types: [],
      loadFilters: false,
      status: 'idle',
      metadata: productsMetadata()
   }),
   reducers: {
      setProductItem: (state, action) => {
         state.product = action.payload
      },
      setProductsMetadata: (state, action) => {
         state.loadProducts = false
         state.metadata = {...state.metadata, ...action.payload}
      },
      resetProductsMetadata: (state) => {
         state.metadata = productsMetadata()
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

export const { setProductItem, setProductsMetadata, resetProductsMetadata } = catalogSlice.actions
export const productSelectors = catalogAdapter.getSelectors((state: AppState) => state.catalog)




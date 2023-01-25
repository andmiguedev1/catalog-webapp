import { createEntityAdapter , createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import agent from '../../api/agent'
import { AppState } from '../appStore'
import { Product } from '../../models/product'

interface ProductsState {
   loadProducts: boolean,
   product: Product | null
   brands: Array<string>
   types: Array<string>
   loadFilters: boolean
   status: string
}

const productsAdapter = createEntityAdapter<Product>()

export const getProductFilters = createAsyncThunk(
   'products/getProductFilters',
   async (_, thunkAPI) => {
      try {
         return await agent.CatalogRoutes.getProductCategories()
      } catch (message: any) {
         return thunkAPI.rejectWithValue({ error: message.data })
      }
   }
)

export const fetchProductsAsync = createAsyncThunk<Product[]>(
   'products/fetchProductsAsync', async (_, thunkAPI) => {
      try {
         return await agent.CatalogRoutes.getRecentProducts()
      } catch (message: any) {
         return thunkAPI.rejectWithValue({
            error: message.data
         })
      }
   }
)

export const productsSlice = createSlice({
   name: 'products',
   initialState: productsAdapter.getInitialState<ProductsState>({
      loadProducts: false,
      product: null,
      brands: [],
      types: [],
      loadFilters: false,
      status: 'idle'
   }),
   reducers: {
      setProductItem: (state, action) => {
         state.product = action.payload
      },
   },
   extraReducers: (builder => {
      builder.addCase(fetchProductsAsync.pending, (state) => {
         state.status = 'pendingFetchProducts'
      })
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
         productsAdapter.setAll(state, action.payload)
         state.status = 'idle'
         state.loadProducts = true
      })
      builder.addCase(fetchProductsAsync.rejected, (state, action) => {
         console.log(action.payload)
         state.status = 'idle'
      })
      builder.addCase(getProductFilters.pending, (state) => {
         state.status = 'pendingProductFilters'
      })
      builder.addCase(getProductFilters.fulfilled, (state, action) => {
         state.brands = action.payload.brands
         state.types = action.payload.types
         state.loadFilters = true
         state.status = 'idle'
      })
      builder.addCase(getProductFilters.rejected, (state) => {
         state.loadFilters = false
         state.status = 'idle'
      })
   })
})

export const { setProductItem } = productsSlice.actions
export const productSelectors = productsAdapter.getSelectors((state: AppState) => state.products)




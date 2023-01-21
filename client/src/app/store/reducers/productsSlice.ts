import { AppState } from './../appStore';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import agent from '../../api/agent';
import { Product } from '../../models/product'

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]>(
   'products/fetchProductsAsync', async () => {
      try {
         return await agent.CatalogRoutes.getRecentProducts()
      } catch (message) {
         console.error(message)
      }
   }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
   'products/fetchProductAsync', async (productId) => {
      try {
         return await agent.CatalogRoutes.getSingleProduct(productId)
      } catch (message) {
         console.error(message)
      }
   }
)


export const productsSlice = createSlice({
   name: 'products',
   initialState: productsAdapter.getInitialState({
      loadProducts: false,
      status: 'idle'
   }),
   reducers: {},
   extraReducers: (builder => {
      builder.addCase(fetchProductsAsync.pending, (state) => {
         state.status = 'pendingFetchProducts'
      })
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
         productsAdapter.setAll(state, action.payload)
         state.status = 'idle'
         state.loadProducts = true
      })
      builder.addCase(fetchProductsAsync.rejected, (state) => {
         state.status = 'idle'
      })
      builder.addCase(fetchProductAsync.pending, (state) => {
         state.status = 'pendingFetchProduct'
      })
      builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
         productsAdapter.upsertOne(state, action.payload)
         state.status = 'idle'
      })
      builder.addCase(fetchProductAsync.rejected, (state) => {
         state.status = 'idle'
      })
   }) 
})

export const productSelectors = productsAdapter.getSelectors((state: AppState) => state.products)
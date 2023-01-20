import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../models/product'

interface ProductState {
   product: Product | null
   products: Product[]
}

const initialState: ProductState = {
   product: null,
   products: []
}

export const productsSlice = createSlice({
   name: 'product',
   initialState,
   reducers: {
      setProductItem: (state, action) => {
         state.product = action.payload
      },
      setProductItems: (state, action) => {
         state.products = action.payload
      }
   }
})

export const { setProductItem, setProductItems } = productsSlice.actions
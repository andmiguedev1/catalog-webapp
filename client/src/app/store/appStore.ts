import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

import { catalogSlice } from './reducers/catalogSlice';
import { cartSlice } from './reducers/cartSlice'


export const store = configureStore({
   reducer: {
      catalog: catalogSlice.reducer,
      cart: cartSlice.reducer
   }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
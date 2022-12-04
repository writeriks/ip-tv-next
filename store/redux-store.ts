import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './reducers/ui-reducer/ui-slice'

const reducer = {
  ui: uiSlice,
}

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV != 'production',
})

export type RootState = ReturnType<typeof store.getState>

export default store

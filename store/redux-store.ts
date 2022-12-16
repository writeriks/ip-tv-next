import { configureStore } from '@reduxjs/toolkit'
import channelsSlice from './reducers/channels-reducer/channels-slice'
import contextSlice from './reducers/context-reducer/context-slice'
import uiSlice from './reducers/ui-reducer/ui-slice'

const reducer = {
  ui: uiSlice,
  context: contextSlice,
  channels: channelsSlice,
}

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV != 'production',
})

export type RootState = ReturnType<typeof store.getState>

export default store

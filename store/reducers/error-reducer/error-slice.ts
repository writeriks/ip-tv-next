import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ErrorObject {
  title: string
  message: string
}

export interface ErrorState {
  error: ErrorObject | null
}

export const initialState: ErrorState = {
  error: null,
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorObject | null>) => {
      state.error = action.payload
    },
  },
})

export const { setError } = errorSlice.actions

export default errorSlice.reducer

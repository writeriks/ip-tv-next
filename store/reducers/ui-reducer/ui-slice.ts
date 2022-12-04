import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  isLoading: boolean
}

export const initialState: UIState = {
  isLoading: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setIsLoading } = uiSlice.actions

export default uiSlice.reducer

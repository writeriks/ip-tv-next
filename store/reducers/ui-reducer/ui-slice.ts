import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  isLoading: boolean
  isSideBarVisible: boolean
  sideBarWidth: number
}

export const initialState: UIState = {
  isLoading: false,
  isSideBarVisible: true,
  sideBarWidth: 250,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    setIsSideBarVisible: (state, action: PayloadAction<boolean>) => {
      state.isSideBarVisible = action.payload
    },

    setSideBarWidth: (state, action: PayloadAction<number>) => {
      state.sideBarWidth = action.payload
    },
  },
})

export const { setIsLoading, setIsSideBarVisible, setSideBarWidth } = uiSlice.actions

export default uiSlice.reducer

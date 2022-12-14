import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum Modal {
  login = 'login',
}

export interface UIState {
  isLoading: boolean
  isSideBarVisible: boolean
  sideBarWidth: number
  modal: Modal | null
}

export const initialState: UIState = {
  isLoading: false,
  isSideBarVisible: true,
  sideBarWidth: 250,
  modal: null,
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

    openLoginModal: (state) => {
      state.modal = Modal.login
    },

    closeModal: (state) => {
      state.modal = null
    },
  },
})

export const { setIsLoading, setIsSideBarVisible, setSideBarWidth, openLoginModal, closeModal } = uiSlice.actions

export default uiSlice.reducer

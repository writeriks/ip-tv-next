import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parser from 'iptv-playlist-parser'

export interface ContextState {
  channels: parser.Playlist
  isMobile: boolean
  selectedCategory: selectedCategory | null
}

export enum selectedCategory {
  LIVE = 'LIVE',
  MOVIES = 'MOEVIES',
  SERIES = 'SERIES',
}

export const initialState: ContextState = {
  channels: {} as parser.Playlist,
  isMobile: false,
  selectedCategory: null,
}

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<selectedCategory | null>) => {
      state.selectedCategory = action.payload
    },
  },
})

export const { setIsMobile, setSelectedCategory } = contextSlice.actions

export default contextSlice.reducer

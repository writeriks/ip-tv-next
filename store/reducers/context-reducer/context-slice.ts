import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parser from 'iptv-playlist-parser'

export interface ContextState {
  channels: parser.Playlist
  isMobile: boolean
  selectedCategory: selectedCategory | null
  selectedTitle: string
  searchText: string
  liveChannelTitles: string[]
  movieTitles: string[]
  serialTitles: string[]
}

export enum selectedCategory {
  LIVE = 'live',
  MOVIE = 'movie',
  SERIES = 'series',
}

export const initialState: ContextState = {
  channels: {} as parser.Playlist,
  isMobile: false,
  selectedCategory: null,
  selectedTitle: '',
  searchText: '',
  liveChannelTitles: [],
  movieTitles: [],
  serialTitles: [],
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
    setSelectedTitle: (state, action: PayloadAction<string>) => {
      state.selectedTitle = action.payload
    },

    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
  },
})

export const { setIsMobile, setSelectedCategory, setSelectedTitle, setSearchText } = contextSlice.actions

export default contextSlice.reducer

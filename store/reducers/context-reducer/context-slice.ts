import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parser from 'iptv-playlist-parser'

export interface ContextState {
  channels: parser.Playlist
  isMobile: boolean
}

export const initialState: ContextState = {
  channels: {} as parser.Playlist,
  isMobile: false,
}

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<parser.Playlist>) => {
      state.channels = action.payload
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload
    },
  },
})

export const { setChannels, setIsMobile } = contextSlice.actions

export default contextSlice.reducer

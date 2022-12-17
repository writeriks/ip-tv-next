import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parser from 'iptv-playlist-parser'

export interface ChannelsState {
  series: playlistDictionary
  movies: playlistDictionary
  liveChannels: playlistDictionary
}

export interface playlistDictionary {
  [key: string]: parser.PlaylistItem[]
}

export const initialState: ChannelsState = {
  movies: {},
  liveChannels: {},
  series: {},
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<playlistDictionary>) => {
      state.movies = action.payload
    },

    setLiveChannels: (state, action: PayloadAction<playlistDictionary>) => {
      state.liveChannels = action.payload
    },

    setSeries: (state, action: PayloadAction<playlistDictionary>) => {
      state.series = action.payload
    },
  },
})

export const { setMovies, setSeries, setLiveChannels } = channelsSlice.actions

export default channelsSlice.reducer

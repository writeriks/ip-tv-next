import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parser from 'iptv-playlist-parser'

export interface ChannelsState {
  movies: playlistDictionary
  liveChannels: playlistDictionary
  series: playlistDictionary
  seriesPosters: playlistDictionary
}

export interface playlistDictionary {
  [key: string]: parser.PlaylistItem[]
}

export const initialState: ChannelsState = {
  movies: {},
  liveChannels: {},
  series: {},
  seriesPosters: {},
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

    setSeriesPosters: (state, action: PayloadAction<playlistDictionary>) => {
      state.seriesPosters = action.payload
    },
  },
})

export const { setMovies, setSeries, setLiveChannels, setSeriesPosters } = channelsSlice.actions

export default channelsSlice.reducer

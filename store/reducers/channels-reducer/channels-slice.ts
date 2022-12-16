import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parser from 'iptv-playlist-parser'

export interface ChannelsState {
  allChannels: parser.Playlist
  movies: parser.Playlist
  series: parser.Playlist
  liveChannels: parser.Playlist
}

export enum selectedCategory {
  LIVE = 'LIVE',
  MOVIES = 'MOEVIES',
  SERIES = 'SERIES',
}

export const initialState: ChannelsState = {
  allChannels: {} as parser.Playlist,
  movies: {} as parser.Playlist,
  series: {} as parser.Playlist,
  liveChannels: {} as parser.Playlist,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<parser.Playlist>) => {
      state.allChannels = action.payload
    },

    setMovies: (state, action: PayloadAction<parser.Playlist>) => {
      state.movies = action.payload
    },

    setSeries: (state, action: PayloadAction<parser.Playlist>) => {
      state.series = action.payload
    },
    setLiveChannels: (state, action: PayloadAction<parser.Playlist>) => {
      state.liveChannels = action.payload
    },
  },
})

export const { setChannels, setMovies, setSeries, setLiveChannels } = channelsSlice.actions

export default channelsSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parser from 'iptv-playlist-parser'

export interface ChannelsState {
  allChannels: parser.Playlist
  movies: parser.PlaylistItem[]
  series: parser.PlaylistItem[]
  liveChannels: parser.PlaylistItem[]
}

export const initialState: ChannelsState = {
  allChannels: {} as parser.Playlist,
  movies: [],
  series: [],
  liveChannels: [],
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<parser.Playlist>) => {
      state.allChannels = action.payload
    },

    setMovies: (state, action: PayloadAction<parser.PlaylistItem[]>) => {
      state.movies = [...action.payload]
    },

    setSeries: (state, action: PayloadAction<parser.PlaylistItem[]>) => {
      state.series = [...action.payload]
    },
    setLiveChannels: (state, action: PayloadAction<parser.PlaylistItem[]>) => {
      state.liveChannels = [...action.payload]
    },
  },
})

export const { setChannels, setMovies, setSeries, setLiveChannels } = channelsSlice.actions

export default channelsSlice.reducer

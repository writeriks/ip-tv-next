import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parser from 'iptv-playlist-parser'

export interface ChannelsState {
  movies: playlistDictionary
  liveChannels: playlistDictionary
  parsedSeries: ParsedSeries
}

export interface playlistDictionary {
  [key: string]: parser.PlaylistItem[]
}

export interface ParsedSeries {
  [title: string]: ParsedSerialTitles
}

export interface ParsedSerialTitles {
  [serialName: string]: parser.PlaylistItem[]
}

export const initialState: ChannelsState = {
  movies: {},
  liveChannels: {},
  parsedSeries: {},
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

    setParsedSeries: (state, action: PayloadAction<ParsedSeries>) => {
      state.parsedSeries = action.payload
    },
  },
})

export const { setMovies, setParsedSeries, setLiveChannels } = channelsSlice.actions

export default channelsSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parser from 'iptv-playlist-parser'

export interface ChannelsState {
  movies: playlistDictionary
  liveChannels: playlistDictionary
  parsedSeries: ParsedSeries
  selectedSerial: parser.PlaylistItem[] | null
  selectedNonSerial: parser.PlaylistItem | null
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
  selectedSerial: null,
  selectedNonSerial: null,
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

    setSelectedSerial: (state, action: PayloadAction<parser.PlaylistItem[] | null>) => {
      state.selectedSerial = action.payload
    },

    setSelectedNonSerial: (state, action: PayloadAction<parser.PlaylistItem | null>) => {
      state.selectedNonSerial = action.payload
    },
  },
})

export const { setMovies, setParsedSeries, setLiveChannels, setSelectedSerial, setSelectedNonSerial } =
  channelsSlice.actions

export default channelsSlice.reducer

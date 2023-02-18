import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parser from 'iptv-playlist-parser'
import channelsSliceHelper from './channels-slice-helper'

export interface SerialsSeasonDictionary {
  [key: string]: parser.PlaylistItem[]
}
export interface ChannelsState {
  movies: playlistDictionary
  liveChannels: playlistDictionary
  parsedSeries: ParsedSeries
  selectedNonSerial: parser.PlaylistItem | null
  selectedSerial: SerialsSeasonDictionary | null
  selectedSeason: string | null
  selectedSerialEpisode: parser.PlaylistItem | null
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
  selectedNonSerial: null,
  selectedSerial: null,
  selectedSerialEpisode: null,
  selectedSeason: null,
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

    setSelectedNonSerial: (state, action: PayloadAction<parser.PlaylistItem | null>) => {
      state.selectedNonSerial = action.payload
    },

    setSelectedSerial: (state, action: PayloadAction<parser.PlaylistItem[] | null>) => {
      state.selectedSerial = channelsSliceHelper.handleSerialSeasons(action.payload)
    },

    setSelectedSerialEpisode: (state, action: PayloadAction<parser.PlaylistItem | null>) => {
      state.selectedSerialEpisode = action.payload
    },

    setSelectedSeason: (state, action: PayloadAction<string | null>) => {
      state.selectedSeason = action.payload
    },
  },
})

export const {
  setMovies,
  setParsedSeries,
  setLiveChannels,
  setSelectedSerial,
  setSelectedNonSerial,
  setSelectedSerialEpisode,
  setSelectedSeason,
} = channelsSlice.actions

export default channelsSlice.reducer

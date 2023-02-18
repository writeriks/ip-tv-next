import { PlaylistItem } from 'iptv-playlist-parser'
import {
  ParsedSerialTitles,
  ParsedSeries,
  playlistDictionary,
  setSelectedNonSerial,
  setSelectedSerial,
} from '../../../../store/reducers/channels-reducer/channels-slice'
import { setSearchText } from '../../../../store/reducers/context-reducer/context-slice'
import store from '../../../../store/redux-store'

class ContentListHelper {
  handleSelectedSerial = (playlistItems: PlaylistItem[]) => {
    store.dispatch(setSelectedSerial(playlistItems))
    store.dispatch(setSearchText(''))
  }

  handleSelectedNonSerial = (playlistItem: PlaylistItem) => {
    store.dispatch(setSelectedNonSerial(playlistItem))
  }

  getPlaylistByTitle = (
    isSeries: boolean,
    selectedTitle: string,
    parsedSeries?: ParsedSeries,
    playlist?: playlistDictionary,
    searchText?: string
  ) => {
    if (isSeries && parsedSeries) {
      return searchText ? this.filteredSerials(parsedSeries[selectedTitle], searchText) : parsedSeries[selectedTitle]
    } else if (playlist) {
      return searchText ? this.filteredChannelsOrMovies(playlist[selectedTitle], searchText) : playlist[selectedTitle]
    }
  }

  filteredChannelsOrMovies = (playlist: PlaylistItem[], searchText: string) =>
    playlist.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))

  filteredSerials = (parsedSerialTitles: ParsedSerialTitles, searchText: string) =>
    Object.fromEntries(
      Object.entries(parsedSerialTitles).filter(([title]) => title.toLowerCase().includes(searchText.toLowerCase()))
    )
}

const contentListHelper = new ContentListHelper()
export default contentListHelper

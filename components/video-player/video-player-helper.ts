import { PlaylistItem } from 'iptv-playlist-parser'
import {
  ParsedSeries,
  setSelectedNonSerial,
  setSelectedSerialEpisode,
} from '../../store/reducers/channels-reducer/channels-slice'
import { selectedCategory } from '../../store/reducers/context-reducer/context-slice'
import store from '../../store/redux-store'
import parser from 'iptv-playlist-parser'

class VideoPlayerHelper {
  getPlayUrl = (url: string, category: selectedCategory) => {
    if (category !== selectedCategory.LIVE) {
      return url
    }
    return url.replace('.ts', '.m3u8')
  }

  onHeaderBackClick = (episode: PlaylistItem | null) => {
    if (episode) {
      store.dispatch(setSelectedSerialEpisode(null))
    } else {
      store.dispatch(setSelectedSerialEpisode(null))
      store.dispatch(setSelectedNonSerial(null))
    }
  }

  handleSelectedEpisode = (selectedEpisode: parser.PlaylistItem) => {
    store.dispatch(setSelectedSerialEpisode(selectedEpisode))
  }

  getSiblingEpisode = (
    selectedSerial: PlaylistItem[],
    selectedSerialEpisode: parser.PlaylistItem,
    isNext: boolean
  ): parser.PlaylistItem | null => {
    const selectedEpisodeIndex = selectedSerial.findIndex((serial) => serial.name === selectedSerialEpisode?.name)
    const siblingEpisodeIndex = isNext ? selectedEpisodeIndex + 1 : selectedEpisodeIndex - 1
    const siblingEpisode = selectedSerial[siblingEpisodeIndex]
    return siblingEpisode || null
  }

  getSerialNextEpisode = (
    parsedSerials: ParsedSeries,
    selectedSerialEpisode: parser.PlaylistItem,
    selectedTitle: string
  ): parser.PlaylistItem | null => {
    const selectedSerial = this.getSelectedSerial(selectedSerialEpisode, parsedSerials, selectedTitle)
    return this.getSiblingEpisode(selectedSerial, selectedSerialEpisode, true)
  }

  getSerialPreviousEpisode = (
    parsedSerials: ParsedSeries,
    selectedSerialEpisode: parser.PlaylistItem,
    selectedTitle: string
  ): parser.PlaylistItem | null => {
    const selectedSerial = this.getSelectedSerial(selectedSerialEpisode, parsedSerials, selectedTitle)
    return this.getSiblingEpisode(selectedSerial, selectedSerialEpisode, false)
  }

  private getSelectedSerial(selectedSerialEpisode: PlaylistItem, parsedSerials: ParsedSeries, selectedTitle: string) {
    const serialName = selectedSerialEpisode.name.split(/ S[0-9]/)[0]
    return parsedSerials[selectedTitle][serialName]
  }
}

const videoPlayerHelper = new VideoPlayerHelper()
export default videoPlayerHelper

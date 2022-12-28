import { PlaylistItem } from 'iptv-playlist-parser'
import { setSelectedNonSerial, setSelectedSerial } from '../../../../store/reducers/channels-reducer/channels-slice'
import store from '../../../../store/redux-store'

class ContentListHelper {
  handleSelectedSerial = (playlistItems: PlaylistItem[]) => {
    store.dispatch(setSelectedSerial(playlistItems))
  }

  handleSelectedNonSerial = (playlistItem: PlaylistItem) => {
    store.dispatch(setSelectedNonSerial(playlistItem))
  }
}

const contentListHelper = new ContentListHelper()
export default contentListHelper

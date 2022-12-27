import { PlaylistItem } from 'iptv-playlist-parser'
import { setSelectedNonSerial, setSelectedSerialEpisode } from '../../store/reducers/channels-reducer/channels-slice'
import { selectedCategory } from '../../store/reducers/context-reducer/context-slice'
import store from '../../store/redux-store'

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
}

const videoPlayerHelper = new VideoPlayerHelper()
export default videoPlayerHelper

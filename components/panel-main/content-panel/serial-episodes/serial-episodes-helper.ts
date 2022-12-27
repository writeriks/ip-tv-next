import { PlaylistItem } from 'iptv-playlist-parser'
import { setSelectedSerialEpisode } from '../../../../store/reducers/channels-reducer/channels-slice'
import store from '../../../../store/redux-store'

class SerialEpisodesHelper {
  handleSelectedEpisode = (episode: PlaylistItem) => {
    store.dispatch(setSelectedSerialEpisode(episode))
  }
}

const serialEpisodesHelper = new SerialEpisodesHelper()
export default serialEpisodesHelper

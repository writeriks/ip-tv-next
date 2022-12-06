import { fetchChannels } from '../api/api'
import parser from 'iptv-playlist-parser'
import store from '../../store/redux-store'
import { setChannels, setIsMobile } from '../../store/reducers/context-reducer/context-slice'
import { parse } from 'next-useragent'

class PlayerService {
  initializeChannels = async (url: string): Promise<void> => {
    const playlistResponse = await fetchChannels(url)
    const { channels }: { channels: parser.Playlist } = await playlistResponse.json()

    store.dispatch(setChannels(channels))
  }

  setIsMobileDevice = (userAgentString: any) => {
    if (userAgentString) {
      setIsMobile(parse(userAgentString).isMobile)
    } else {
      setIsMobile(parse(window.navigator.userAgent).isMobile)
    }
  }
}

const playerService = new PlayerService()
export default playerService

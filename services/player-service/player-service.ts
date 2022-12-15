import { fetchChannels } from '../api/api'
import parser from 'iptv-playlist-parser'
import store from '../../store/redux-store'
import { setChannels, setIsMobile } from '../../store/reducers/context-reducer/context-slice'
import { parse } from 'next-useragent'
import { setIsLoading } from '../../store/reducers/ui-reducer/ui-slice'

class PlayerService {
  initializeChannels = async (username: string, password: string, url: string): Promise<void> => {
    try {
      store.dispatch(setIsLoading(true))
      const playlistResponse = await fetchChannels(username, password, url)
      const { channels }: { channels: parser.Playlist } = await playlistResponse.json()

      store.dispatch(setChannels(channels))
      store.dispatch(setIsLoading(false))
    } catch (error) {
      console.log('🚀 ~ file: player-service.ts:19 ~ PlayerService ~ initializeChannels= ~ error', error)
    }
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

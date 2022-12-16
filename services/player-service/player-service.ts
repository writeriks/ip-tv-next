import { fetchChannels } from '../api/api'
import parser from 'iptv-playlist-parser'
import store from '../../store/redux-store'
import { parse } from 'next-useragent'

import { selectedCategory, setIsMobile } from '../../store/reducers/context-reducer/context-slice'
import { setIsLoading } from '../../store/reducers/ui-reducer/ui-slice'
import { setLiveChannels, setMovies, setSeries } from '../../store/reducers/channels-reducer/channels-slice'
import { LoginProps, loginStorage } from '../../components/login-modal/login-types'

class PlayerService {
  initializeChannels = async (formdata: LoginProps): Promise<void> => {
    await this.getAndStoreAllChannels(formdata)
  }

  refreshChannels = async () => {
    const storedLoginForm = JSON.parse(localStorage.getItem(loginStorage.LOGIN_FORM) as string)
    if (storedLoginForm) {
      await this.getAndStoreAllChannels(storedLoginForm)
    }
  }

  private async getAndStoreAllChannels(formdata: LoginProps) {
    try {
      const { username, password, url } = formdata
      store.dispatch(setIsLoading(true))
      const playlistResponse = await fetchChannels(username, password, url)
      const { channels }: { channels: parser.Playlist } = await playlistResponse.json()

      if (Object.keys(channels)) {
        const liveChannels = channels.items.filter((channel) => channel.raw.includes(`/${selectedCategory.LIVE}/`))
        const series = channels.items.filter((channel) => channel.raw.includes(`/${selectedCategory.SERIES}/`))
        const movies = channels.items.filter((channel) => channel.raw.includes(`/${selectedCategory.MOVIE}/`))

        await Promise.all([
          store.dispatch(setLiveChannels(liveChannels)),
          store.dispatch(setSeries(series)),
          store.dispatch(setMovies(movies)),
        ])

        localStorage.setItem(loginStorage.LOGIN_FORM, JSON.stringify(formdata))
      }
      store.dispatch(setIsLoading(false))
    } catch (error) {
      store.dispatch(setIsLoading(false))
      console.log('error on getting channels', error)
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

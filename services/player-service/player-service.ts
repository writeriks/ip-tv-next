import { fetchChannels } from '../api/api'
import store from '../../store/redux-store'
import { parse } from 'next-useragent'

import errorHandler from '../error-handler/error-handler'

import { selectedCategory, setIsMobile } from '../../store/reducers/context-reducer/context-slice'
import { setIsLoading } from '../../store/reducers/ui-reducer/ui-slice'
import { setLiveChannels, setMovies, setParsedSeries } from '../../store/reducers/channels-reducer/channels-slice'

import { LoginProps, loginStorage } from '../../components/login-modal/login-types'
import { PlaylistObject } from './types'

class PlayerService {
  @errorHandler.errorDecorator
  async initializeChannels(formdata: LoginProps): Promise<void> {
    await this.getAndStoreAllChannels(formdata)
  }

  @errorHandler.errorDecorator
  async refreshChannels() {
    const storedLoginForm = JSON.parse(localStorage.getItem(loginStorage.LOGIN_FORM) as string)
    if (storedLoginForm) {
      await this.getAndStoreAllChannels(storedLoginForm)
    }
  }

  private async getAndStoreAllChannels(formdata: LoginProps) {
    const { url, rememberMe } = formdata
    store.dispatch(setIsLoading(true))
    const playlistObject = (await fetchChannels(url)) as PlaylistObject

    await this.setPlaylistItems(playlistObject)
    this.handleCrendentials(rememberMe, formdata)
    store.dispatch(setIsLoading(false))
  }

  private handleCrendentials(rememberMe: boolean, formdata: LoginProps) {
    if (rememberMe) {
      localStorage.setItem(loginStorage.LOGIN_FORM, JSON.stringify(formdata))
    } else {
      localStorage.removeItem(loginStorage.LOGIN_FORM)
    }
  }

  private async setPlaylistItems(playlistObject: PlaylistObject) {
    const { liveChannelsObject, moviesObject, seriesObject } = playlistObject

    await Promise.all([
      store.dispatch(setLiveChannels(liveChannelsObject)),
      store.dispatch(setMovies(moviesObject)),
      store.dispatch(setParsedSeries(seriesObject)),
    ])
  }

  getSelectedPlaylistSelector(category: selectedCategory | null) {
    switch (category) {
      case selectedCategory.LIVE:
        return 'getLiveChannels'

      case selectedCategory.MOVIE:
        return 'getMovies'

      default:
        return 'getLiveChannels'
    }
  }

  setIsMobileDevice(userAgentString: any) {
    if (userAgentString) {
      setIsMobile(parse(userAgentString).isMobile)
    } else {
      setIsMobile(parse(window.navigator.userAgent).isMobile)
    }
  }
}

const playerService = new PlayerService()
export default playerService

import { fetchChannels } from '../api/api'
import parser from 'iptv-playlist-parser'
import store from '../../store/redux-store'
import { parse } from 'next-useragent'

import errorHandler from '../error-handler/error-handler'

import { selectedCategory, setIsMobile } from '../../store/reducers/context-reducer/context-slice'
import { setIsLoading } from '../../store/reducers/ui-reducer/ui-slice'
import {
  ParsedSeries,
  ParsedNonSerials,
  setLiveChannels,
  setMovies,
  setParsedSeries,
} from '../../store/reducers/channels-reducer/channels-slice'

import { LoginProps, loginStorage } from '../../components/login-modal/login-types'

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
    const { username, password, url } = formdata
    store.dispatch(setIsLoading(true))
    const channels = await fetchChannels(username, password, url)
    const { items: playlistItems } = channels as parser.Playlist

    if (playlistItems.length) {
      await this.parsePlaylistItems(playlistItems)
      localStorage.setItem(loginStorage.LOGIN_FORM, JSON.stringify(formdata))
    }
    store.dispatch(setIsLoading(false))
  }

  private async parsePlaylistItems(playlistItems: parser.PlaylistItem[]) {
    const liveChannels = playlistItems.filter((channel) => channel.raw.includes(`/${selectedCategory.LIVE}/`))
    const series = playlistItems.filter((channel) => channel.raw.includes(`/${selectedCategory.SERIES}/`))
    const movies = playlistItems.filter((channel) => channel.raw.includes(`/${selectedCategory.MOVIE}/`))

    const liveChannelTitles = this.getTitles(liveChannels)
    const serialTitles = this.getTitles(series)
    const movieTitles = this.getTitles(movies)

    const liveChannelsObject = this.setLiveChannelsAndMoviesByTitle(liveChannels, liveChannelTitles)
    const moviesObject = this.setLiveChannelsAndMoviesByTitle(movies, movieTitles)
    const seriesObject = this.parseSeriesByTitle(series, serialTitles)

    await Promise.all([
      store.dispatch(setLiveChannels(liveChannelsObject)),
      store.dispatch(setMovies(moviesObject)),
      store.dispatch(setParsedSeries(seriesObject)),
    ])
  }

  parseSeriesByTitle(playlistItemArray: parser.PlaylistItem[], titles: string[]): ParsedSeries {
    const playlistByTitleAndSerialName = titles.reduce((acc, title) => {
      const serialsByGroupTitle = playlistItemArray.filter(({ group: { title: itemTitle } }) => itemTitle === title)
      const serialNames = [...new Set(serialsByGroupTitle.map(({ name }) => name.split(/ S[0-9]/)[0]))]

      const serialObject = serialNames.reduce((obj, serialName) => {
        const serialArray = serialsByGroupTitle.filter(({ name }) => name.split(/ S[0-9]/)[0] === serialName)
        return { ...obj, [serialName]: serialArray }
      }, {})

      return { ...acc, [title]: serialObject }
    }, {})

    return playlistByTitleAndSerialName
  }

  filterDuplicateSerialNames(series: parser.PlaylistItem[], serialTitles: string[]) {
    const names = series.map((o) => o.name.split(/ S[0-9]/)[0])
    const seriesPosters = series.filter(({ name }, index) => !names.includes(name.split(/ S[0-9]/)[0], index + 1))
    return this.setLiveChannelsAndMoviesByTitle(seriesPosters, serialTitles)
  }

  getTitles(playlistItem: parser.PlaylistItem[]) {
    const uniqueTitles = new Set(playlistItem.map(({ group: { title } }) => title))
    return [...uniqueTitles]
  }

  setLiveChannelsAndMoviesByTitle(playlistItemArray: parser.PlaylistItem[], titles: string[]): ParsedNonSerials {
    const playlistByTitle = titles.reduce((acc, title) => {
      const channelsByTitle = playlistItemArray.filter(({ group: { title: itemTitle } }) => itemTitle === title)
      return { ...acc, [title]: channelsByTitle }
    }, {})

    return playlistByTitle
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

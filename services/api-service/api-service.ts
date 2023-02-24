import parser from 'iptv-playlist-parser'
import { ParsedNonSerials, ParsedSeries } from '../../store/reducers/channels-reducer/channels-slice'
import { selectedCategory } from '../../store/reducers/context-reducer/context-slice'
import { PlaylistObject } from '../player-service/types'

class ApiService {
  async parsePlaylistItems(response: Response): Promise<PlaylistObject> {
    const textResponse = await response.text()
    const channels: parser.Playlist = parser.parse(textResponse)
    const { items: playlistItems } = channels

    const liveChannels = playlistItems.filter((channel) => channel.raw.includes(`/${selectedCategory.LIVE}/`))
    const series = playlistItems.filter((channel) => channel.raw.includes(`/${selectedCategory.SERIES}/`))
    const movies = playlistItems.filter((channel) => channel.raw.includes(`/${selectedCategory.MOVIE}/`))

    const liveChannelTitles = this.getTitles(liveChannels)
    const serialTitles = this.getTitles(series)
    const movieTitles = this.getTitles(movies)

    const liveChannelsObject = this.setLiveChannelsAndMoviesByTitle(liveChannels, liveChannelTitles)
    const moviesObject = this.setLiveChannelsAndMoviesByTitle(movies, movieTitles)
    const seriesObject = this.parseSeriesByTitle(series, serialTitles)

    return { liveChannelsObject, moviesObject, seriesObject }
  }

  setLiveChannelsAndMoviesByTitle(playlistItemArray: parser.PlaylistItem[], titles: string[]): ParsedNonSerials {
    const playlistByTitle = titles.reduce((acc, title) => {
      const channelsByTitle = playlistItemArray.filter(({ group: { title: itemTitle } }) => itemTitle === title)
      return { ...acc, [title]: channelsByTitle }
    }, {})

    return playlistByTitle
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

  getTitles(playlistItem: parser.PlaylistItem[]) {
    const uniqueTitles = new Set(playlistItem.map(({ group: { title } }) => title))
    return [...uniqueTitles]
  }
}

const apiService = new ApiService()
export default apiService

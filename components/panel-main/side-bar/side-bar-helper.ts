import parser from 'iptv-playlist-parser'
import { selectedCategory } from '../../../store/reducers/context-reducer/context-slice'

class SideBarHelper {
  getSelectedPlaylistName = (category: selectedCategory | null) => {
    switch (category) {
      case selectedCategory.LIVE:
        return 'getLiveChannels'

      case selectedCategory.MOVIE:
        return 'getMovies'

      case selectedCategory.SERIES:
        return 'getSeries'

      default:
        return 'getLiveChannels'
    }
  }

  getTitles = (playlistItem: parser.PlaylistItem[]) => {
    const titlesSet = new Set(playlistItem.map((item) => item.group.title))
    return Array.from(titlesSet)
  }
}

const sideBarHelper = new SideBarHelper()
export default sideBarHelper

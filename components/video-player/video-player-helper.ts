import { selectedCategory } from '../../store/reducers/context-reducer/context-slice'

class VideoPlayerHelper {
  getPlayUrl = (url: string, category: selectedCategory) => {
    if (category !== selectedCategory.LIVE) {
      return url
    }
    return url.replace('.ts', '.m3u8')
  }
}

const videoPlayerHelper = new VideoPlayerHelper()
export default videoPlayerHelper

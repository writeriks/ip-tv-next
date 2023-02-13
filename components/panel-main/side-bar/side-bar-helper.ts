import {
  setSelectedNonSerial,
  setSelectedSerial,
  setSelectedSerialEpisode,
} from '../../../store/reducers/channels-reducer/channels-slice'
import {
  setSearchText,
  setSelectedCategory,
  setSelectedTitle,
} from '../../../store/reducers/context-reducer/context-slice'
import { setIsSideBarVisible } from '../../../store/reducers/ui-reducer/ui-slice'
import store from '../../../store/redux-store'

class SideBarHelper {
  onBackItemClick = async () => {
    await Promise.all([
      store.dispatch(setSelectedCategory(null)),
      store.dispatch(setSelectedTitle('')),
      store.dispatch(setSelectedSerial(null)),
      store.dispatch(setSelectedNonSerial(null)),
      store.dispatch(setSelectedTitle('')),
      store.dispatch(setSelectedSerialEpisode(null)),
      store.dispatch(setSearchText('')),
    ])
  }

  hideSideBar = () => {
    store.dispatch(setIsSideBarVisible(false))
  }

  handleChannelSelect = async (title: string) => {
    await Promise.all([
      store.dispatch(setSelectedSerial(null)),
      store.dispatch(setSelectedNonSerial(null)),
      store.dispatch(setSelectedSerialEpisode(null)),
      store.dispatch(setSelectedTitle(title)),
    ])
  }
}

const sideBarHelper = new SideBarHelper()
export default sideBarHelper

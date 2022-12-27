import { setSelectedSeason, setSelectedSerial } from '../../../../store/reducers/channels-reducer/channels-slice'
import { setIsSideBarVisible } from '../../../../store/reducers/ui-reducer/ui-slice'
import store from '../../../../store/redux-store'

class HeaderGeneralHelper {
  handleBackSeasons = () => {
    store.dispatch(setSelectedSerial(null))
  }

  handleSideBarVisible = (isVisible: boolean) => {
    store.dispatch(setIsSideBarVisible(isVisible))
  }

  handleSeasonChange = (seasonValue: string) => {
    store.dispatch(setSelectedSeason(seasonValue))
  }
}

const headerGeneralHelper = new HeaderGeneralHelper()
export default headerGeneralHelper

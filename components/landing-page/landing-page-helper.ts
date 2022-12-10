import { selectedCategory, setSelectedCategory } from '../../store/reducers/context-reducer/context-slice'
import store from '../../store/redux-store'

class LandingPageHelper {
  handleSelectedCategory = (selectedCategory: selectedCategory) => {
    store.dispatch(setSelectedCategory(selectedCategory))
  }
}

const landingPageHelper = new LandingPageHelper()
export default landingPageHelper

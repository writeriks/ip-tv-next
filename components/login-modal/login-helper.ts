import { closeModal } from '../../store/reducers/ui-reducer/ui-slice'
import store from '../../store/redux-store'

class LoginHelper {
  handleCloseModal = () => {
    store.dispatch(closeModal())
  }
}

const loginHelper = new LoginHelper()
export default loginHelper

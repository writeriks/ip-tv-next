import { setError } from '../../store/reducers/error-reducer/error-slice'
import store from '../../store/redux-store'

class ErrorHelper {
  clearError = () => {
    store.dispatch(setError(null))
  }
}

const errorHelper = new ErrorHelper()
export default errorHelper

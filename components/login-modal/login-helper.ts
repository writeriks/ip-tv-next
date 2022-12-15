import playerService from '../../services/player-service/player-service'
import { LoginProps } from './login-types'

class LoginHelper {
  handleUserSettings = (formData: LoginProps) => {
    const { username, password, url } = formData
    playerService.initializeChannels(username, password, url)
  }
}

const loginHelper = new LoginHelper()
export default loginHelper

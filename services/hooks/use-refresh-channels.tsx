import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { LoginProps, loginStorage } from '../../components/login-modal/login-types'
import channelsReducerSelector from '../../store/reducers/channels-reducer/channels-reducer-selector'
import playerService from '../player-service/player-service'

const useRefreshChannels = () => {
  const allChannels = useSelector(channelsReducerSelector.getChannels)
  const didStartFetching = useRef<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLoginForm: LoginProps = JSON.parse(localStorage.getItem(loginStorage.LOGIN_FORM) as string)

      if (storedLoginForm && Object.keys(allChannels).length === 0 && !didStartFetching.current) {
        didStartFetching.current = true
        playerService.initializeChannels(storedLoginForm)
      }
    }
  }, [allChannels])
}

export default useRefreshChannels

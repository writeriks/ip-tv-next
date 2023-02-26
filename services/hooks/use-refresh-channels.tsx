import { useEffect, useRef } from 'react'

import { LoginProps, loginStorage } from '../../components/login-modal/login-types'

import playerService from '../player-service/player-service'

const useRefreshChannels = () => {
  const didStartFetching = useRef<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLoginForm: LoginProps = JSON.parse(localStorage.getItem(loginStorage.LOGIN_FORM) as string)

      if (storedLoginForm && !didStartFetching.current) {
        didStartFetching.current = true
        playerService.initializeChannels(storedLoginForm)
      }
    }
  }, [])
}

export default useRefreshChannels

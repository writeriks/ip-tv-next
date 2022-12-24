import React, { useCallback, useEffect, useState } from 'react'

import { Button } from '@chakra-ui/react'
import LoginSection from './login-section'

import playerService from '../../services/player-service/player-service'

import { defaultLoginProps, LoginProps, loginStorage, loginTypes } from './login-types'
import styles from '../../styles/LoginModal.module.scss'

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginProps>(defaultLoginProps)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLoginForm: LoginProps = JSON.parse(localStorage.getItem(loginStorage.LOGIN_FORM) as string)
      setFormData((prevFormData) => ({ ...prevFormData, ...storedLoginForm }))
    }
  }, [])

  const onChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const formValue = { [target.name]: target.value }
    setFormData((prevFormData) => ({ ...prevFormData, ...formValue }))
  }, [])

  const onSubmitEvent = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      playerService.initializeChannels(formData)
    },
    [formData]
  )

  // TODO: Add fields for player format type and output
  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={onSubmitEvent} className={styles.loginForm} autoComplete="on">
        <LoginSection label={loginTypes.username} value={formData.username} onChange={onChange} type="text" />
        <LoginSection label={loginTypes.password} value={formData.password} onChange={onChange} type="password" />
        <LoginSection label={loginTypes.url} value={formData.url} onChange={onChange} type="url" />

        <section>
          <div className={styles.submitButton}>
            <a></a>
            <Button type="submit" className={styles.inputItem}>
              Submit
            </Button>
          </div>
        </section>
      </form>
    </div>
  )
}

export default LoginForm

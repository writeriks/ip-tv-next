import React, { useCallback, useState } from 'react'

import { Button } from '@chakra-ui/react'
import LoginSection from './login-section'

import { defaultLoginProps, LoginProps, loginTypes } from './login-types'

import styles from '../../styles/LoginModal.module.scss'
import loginHelper from './login-helper'

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginProps>(defaultLoginProps)

  const onChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const formValue = { [target.name]: target.value }

    setFormData((prevFormData) => ({ ...prevFormData, ...formValue }))
  }, [])

  const onSubmitEvent = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      loginHelper.handleUserSettings(formData)
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

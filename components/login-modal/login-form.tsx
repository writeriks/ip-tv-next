import React, { useCallback, useEffect, useState } from 'react'

import LoginInput from './login-input'
import RememberMeCheckbox from './remember-me-checkbox'
import SubmitButton from './submit-button'

import playerService from '../../services/player-service/player-service'

import { defaultLoginProps, LoginProps, loginStorage, loginTypes } from './login-types'
import styles from '../../styles/LoginModal.module.scss'

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginProps>(defaultLoginProps)
  console.log('🚀 ~ file: login-form.tsx:14 ~ LoginForm ~ formData:', formData)

  useEffect(() => {
    const storedLoginForm: LoginProps = JSON.parse(localStorage.getItem(loginStorage.LOGIN_FORM) as string)
    setFormData((prevFormData) => ({ ...prevFormData, ...storedLoginForm }))
  }, [])

  const onChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('🚀 ~ file: login-form.tsx:22 ~ onChange ~ target:', target)
    const isCheckbox = target.type === 'checkbox'
    const formValue = { [target.name]: isCheckbox ? target.checked : target.value }
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
        <section>
          <LoginInput label={loginTypes.url} value={formData.url} onChange={onChange} type="url" />
        </section>
        <section>
          <RememberMeCheckbox
            checkboxId="rememberMeCheckbox"
            label="Remember Me"
            name="isRememberMe"
            isChecked={formData.isRememberMe}
            onChange={onChange}
          />
        </section>
        <section>
          <SubmitButton />
        </section>
      </form>
    </div>
  )
}

export default LoginForm

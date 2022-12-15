import { Button } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'

import styles from '../../styles/LoginModal.module.scss'
import LoginSection from './login-section'

export interface LoginProps {
  username: string
  password: string
  url: string
}

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginProps>({ username: '', password: '', url: '' })
  console.log('🚀 ~ file: login-form.tsx:15 ~ LoginForm ~ formData', formData)

  const onChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const formValue = { [target.name]: target.value }

    setFormData((prevFormData) => ({ ...prevFormData, ...formValue }))
  }, [])

  const onSubmitEvent = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }, [])

  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={onSubmitEvent} className={styles.loginForm} autoComplete="on">
        <LoginSection label="username" value={formData.username} onChange={onChange} type="text" />
        <LoginSection label="password" value={formData.password} onChange={onChange} type="password" />
        <LoginSection label="url" value={formData.url} onChange={onChange} type="url" />

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

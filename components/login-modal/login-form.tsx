import { Button } from '@chakra-ui/react'
import React from 'react'

import styles from '../../styles/LoginModal.module.scss'
import LoginSection from './login-section'

const LoginForm = () => {
  return (
    <div className={styles.loginFormContainer}>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          console.log('asda')
        }}
        className={styles.loginForm}
      >
        <LoginSection label="username" />
        <LoginSection label="password" />
        <LoginSection label="url" />

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

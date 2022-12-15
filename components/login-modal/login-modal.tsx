import React from 'react'

import LoginForm from './login-form'
import LoginHeader from './login-header'

import styles from '../../styles/LoginModal.module.scss'

const LoginModal = () => {
  return (
    <div className={styles.loginModal}>
      <div className={styles.loginContainer}>
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginModal

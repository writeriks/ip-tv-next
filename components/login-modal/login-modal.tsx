import React from 'react'

import styles from '../../styles/LoginModal.module.scss'
import LoginHeader from './login-header'

const LoginModal = () => {
  return (
    <div className={styles.loginModal}>
      <div className={styles.loginContainer}>
        <LoginHeader />
      </div>
    </div>
  )
}

export default LoginModal

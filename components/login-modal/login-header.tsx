import React from 'react'

import { CloseIcon } from '@chakra-ui/icons'

import loginHelper from './login-helper'

import styles from '../../styles/LoginModal.module.scss'

const LoginHeader = () => (
  <div className={styles.loginHeaderContainer}>
    <div className={styles.loginTitle}>
      <label>Login</label>
    </div>
    <div className={styles.closeButton}>
      <button onClick={() => loginHelper.handleCloseModal()}>
        <CloseIcon boxSize={6} />
      </button>
    </div>
  </div>
)

export default LoginHeader

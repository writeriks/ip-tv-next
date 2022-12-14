import React from 'react'

import { CloseIcon } from '@chakra-ui/icons'

import styles from '../../styles/LoginModal.module.scss'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../store/reducers/ui-reducer/ui-slice'

const LoginHeader = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles.loginHeaderContainer}>
      <div className={styles.loginTitle}>
        <label>Login</label>
      </div>
      <div className={styles.closeButton}>
        <button onClick={() => dispatch(closeModal())}>
          <CloseIcon boxSize={6} />
        </button>
      </div>
    </div>
  )
}

export default LoginHeader

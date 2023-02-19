import React from 'react'
import { Button } from '@chakra-ui/react'
import styles from '../../styles/LoginModal.module.scss'

const SubmitButton = () => {
  return (
    <div className={styles.submitButtonGrid}>
      <span />
      <Button type="submit" className={styles.inputItem}>
        Submit
      </Button>
    </div>
  )
}

export default SubmitButton

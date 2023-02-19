import React from 'react'
import { Input, InputProps } from '@chakra-ui/react'

import styles from '../../styles/LoginModal.module.scss'

export interface LoginInputProps extends InputProps {
  label: string
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
}

const LoginInput: React.FC<LoginInputProps> = ({ label, ...props }) => {
  return (
    <>
      <label className={styles.inputGrid}>
        <span>{label}</span>
        <Input
          {...props}
          name={label}
          focusBorderColor="#404186"
          className={styles.inputItem}
          placeholder={label}
          required
        />
      </label>
    </>
  )
}

export default LoginInput

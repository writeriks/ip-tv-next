import React from 'react'
import { Input } from '@chakra-ui/react'

import styles from '../../styles/LoginModal.module.scss'

export interface LoginSectionProps {
  label: string
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  type: React.HTMLInputTypeAttribute
}

const LoginSection: React.FC<LoginSectionProps> = ({ label, onChange, value, type }) => {
  return (
    <section>
      <label className={styles.inputLabel}>
        <a>{label}</a>
        <Input
          type={type}
          onChange={onChange}
          name={label}
          value={value}
          focusBorderColor="#404186"
          className={styles.inputItem}
          placeholder={label}
          required
        />
      </label>
    </section>
  )
}

export default LoginSection

import React from 'react'
import { Input } from '@chakra-ui/react'

import styles from '../../styles/LoginModal.module.scss'

export interface LoginSectionProps {
  label: string
}

const LoginSection: React.FC<LoginSectionProps> = ({ label }) => {
  return (
    <section>
      <label className={styles.inputLabel}>
        <a>{label}</a>
        <Input focusBorderColor="#404186" className={styles.inputItem} placeholder={label} />
      </label>
    </section>
  )
}

export default LoginSection

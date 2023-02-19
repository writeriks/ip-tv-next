import React from 'react'
import { Checkbox, CheckboxProps } from '@chakra-ui/react'
import styles from '../../styles/LoginModal.module.scss'

interface RememberMeCheckboxProps extends CheckboxProps {
  label: string
}

const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({ label, ...props }) => {
  return (
    <div className={styles.rememberMeGrid}>
      <span />
      <div className={styles.rememberMeCheckbox}>
        <Checkbox {...props}>
          <label>{label}</label>
        </Checkbox>
      </div>
    </div>
  )
}

export default RememberMeCheckbox

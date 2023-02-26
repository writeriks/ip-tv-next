import React from 'react'
import { Checkbox, CheckboxProps } from '@chakra-ui/react'
import styles from '../../styles/LoginModal.module.scss'

interface RememberMeCheckboxProps extends CheckboxProps {
  label: string
  checkboxId: string
}

const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({ label, checkboxId, ...props }) => {
  return (
    <div className={styles.rememberMeGrid}>
      <span />
      <div className={styles.rememberMeCheckbox}>
        <Checkbox
          id={checkboxId}
          sx={{ '[data-focus-visible]': { /* borderColor: '#404186', */ boxShadow: '0 0 0 3px #404186' } }}
          {...props}
        >
          <label htmlFor={checkboxId}>{label}</label>
        </Checkbox>
      </div>
    </div>
  )
}

export default RememberMeCheckbox

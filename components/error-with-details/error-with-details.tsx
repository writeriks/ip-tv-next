import React from 'react'

import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react'

import styles from '../../styles/LayoutMain.module.scss'
import { ErrorObject } from '../../store/reducers/error-reducer/error-slice'
import errorHelper from './error-helper'

interface ErrorWithDetailsProps {
  error: ErrorObject
}

const ErrorWithDetails: React.FC<ErrorWithDetailsProps> = ({ error }) => {
  return (
    <div className={styles.errorContainer}>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{error.title}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
        <CloseButton
          onClick={() => errorHelper.clearError()}
          alignSelf="flex-end"
          position="relative"
          right={-1}
          top={-1}
        />
      </Alert>
    </div>
  )
}

export default ErrorWithDetails

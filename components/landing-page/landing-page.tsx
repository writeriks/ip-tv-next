import React from 'react'

import { useSelector } from 'react-redux'

import LoginModal from '../login-modal/login-modal'
import CategorySelection from './category-selection/category-selection'
import LandingHeader from './landing-header/landing-header'

import uiReducerSelector from '../../store/reducers/ui-reducer/ui-reducer-selector'
import { Modal } from '../../store/reducers/ui-reducer/ui-slice'

import styles from '../../styles/LandingPage.module.scss'

const LandingPage = () => {
  const modal = useSelector(uiReducerSelector.getModal)

  const modalComponents = {
    [Modal.login]: <LoginModal />,
  }

  const getModalToRender = () => {
    if (modal) {
      return modalComponents[modal]
    }
  }

  return (
    <div className={styles.landingPageMain}>
      {getModalToRender()}
      <LandingHeader />
      <CategorySelection />
    </div>
  )
}

export default LandingPage

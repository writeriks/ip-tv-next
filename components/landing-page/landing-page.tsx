import React from 'react'

import LoginModal from '../login-modal/login-modal'
import LandingHeader from './landing-header/landing-header'

import styles from '../../styles/LandingPage.module.scss'
import CategorySelection from './category-selection/category-selection'

const LandingPage = () => {
  return (
    <div className={styles.landingPageMain}>
      {/* <LoginModal /> */}
      <LandingHeader />
      <CategorySelection />
    </div>
  )
}

export default LandingPage

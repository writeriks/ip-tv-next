import React from 'react'
import { selectedCategory } from '../../store/reducers/context-reducer/context-slice'

import styles from '../../styles/LandingPage.module.scss'
import landingPageHelper from './landing-page-helper'

const LandingPage = () => {
  return (
    <div className={styles.landingPageMain}>
      <button className={styles.categoryButton} onClick={() => landingPageHelper.handleSelectedCategory(selectedCategory.LIVE)}>
        Live
      </button>
      <button className={styles.categoryButton} onClick={() => landingPageHelper.handleSelectedCategory(selectedCategory.MOVIES)}>
        Movies
      </button>
      <button className={styles.categoryButton} onClick={() => landingPageHelper.handleSelectedCategory(selectedCategory.SERIES)}>
        Series
      </button>
    </div>
  )
}

export default LandingPage

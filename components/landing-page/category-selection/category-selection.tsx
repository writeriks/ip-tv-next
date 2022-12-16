import React from 'react'

import { selectedCategory } from '../../../store/reducers/context-reducer/context-slice'
import landingPageHelper from '../landing-page-helper'

import styles from '../../../styles/LandingPage.module.scss'

const CategorySelection = () => {
  return (
    <div className={styles.categorySelection}>
      <button
        className={styles.categoryButton}
        onClick={() => landingPageHelper.handleSelectedCategory(selectedCategory.LIVE)}
      >
        Live
      </button>
      <button
        className={styles.categoryButton}
        onClick={() => landingPageHelper.handleSelectedCategory(selectedCategory.MOVIE)}
      >
        Movies
      </button>
      <button
        className={styles.categoryButton}
        onClick={() => landingPageHelper.handleSelectedCategory(selectedCategory.SERIES)}
      >
        Series
      </button>
    </div>
  )
}

export default CategorySelection

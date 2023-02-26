import React from 'react'

import { selectedCategory } from '../../../store/reducers/context-reducer/context-slice'
import landingPageHelper from '../landing-page-helper'

import styles from '../../../styles/LandingPage.module.scss'
import { useSelector } from 'react-redux'
import uiReducerSelector from '../../../store/reducers/ui-reducer/ui-reducer-selector'

const CategorySelection = () => {
  const modal = useSelector(uiReducerSelector.getModal)

  return (
    <div className={styles.categorySelection}>
      <button
        disabled={!!modal}
        className={styles.categoryButton}
        onClick={() => landingPageHelper.handleSelectedCategory(selectedCategory.LIVE)}
      >
        Live
      </button>
      <button
        disabled={!!modal}
        className={styles.categoryButton}
        onClick={() => landingPageHelper.handleSelectedCategory(selectedCategory.MOVIE)}
      >
        Movies
      </button>
      <button
        disabled={!!modal}
        className={styles.categoryButton}
        onClick={() => landingPageHelper.handleSelectedCategory(selectedCategory.SERIES)}
      >
        Series
      </button>
    </div>
  )
}

export default CategorySelection

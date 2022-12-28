import React from 'react'

import { useSelector } from 'react-redux'

import PanelMain from '../panel-main/panel-main'
import LandingPage from '../landing-page/landing-page'
import Loading from '../loading/loading'
import ErrorWithDetails from '../error-with-details/error-with-details'

import useRefreshChannels from '../../services/hooks/use-refresh-channels'

import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'
import uiReducerSelector from '../../store/reducers/ui-reducer/ui-reducer-selector'
import errorReducerSelector from '../../store/reducers/error-reducer/error-reducer-selector'

import styles from '../../styles/LayoutMain.module.scss'

const LayoutMain = (): React.ReactElement => {
  const selectedCategory = useSelector(contextReducerSelector.getSelectedCategory)
  const isLoading = useSelector(uiReducerSelector.getIsLoading)
  const error = useSelector(errorReducerSelector.getError)

  useRefreshChannels()

  const panelToRender = () => {
    if (selectedCategory) {
      return <PanelMain />
    }
    return <LandingPage />
  }

  return (
    <div className={styles.layoutContainer}>
      {error && <ErrorWithDetails error={error} />}
      <div className={styles.layout}>
        {isLoading && <Loading />}
        {panelToRender()}
      </div>
    </div>
  )
}

export default LayoutMain

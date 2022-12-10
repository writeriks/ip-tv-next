import React from 'react'

import { useSelector } from 'react-redux'

import SideBar from '../panel-main/side-bar/side-bar'
import ContentPanel from '../panel-main/content-panel/content-panel'

import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'
import uiReducerSelector from '../../store/reducers/ui-reducer/ui-reducer-selector'

import styles from '../../styles/LayoutMain.module.scss'
import PanelMain from '../panel-main/panel-main'
import LandingPage from '../landing-page/landing-page'

const LayoutMain = (): React.ReactElement => {
  const channels = useSelector(contextReducerSelector.getChannels)
  const selectedCategory = useSelector(contextReducerSelector.getSelectedCategory)
  const isSideBarVisible = useSelector(uiReducerSelector.getIsSideBarVisible)
  console.log('🚀 ~ file: home-page.tsx:11 ~ LayoutMain ~ channels', channels)

  const panelToRender = () => {
    if (selectedCategory) {
      return <PanelMain />
    }
    return <LandingPage />
  }

  return (
    <div className={styles.layout}>
      {/* {isSideBarVisible && <SideBar />}
      <ContentPanel /> */}
      {panelToRender()}
    </div>
  )
}

export default LayoutMain

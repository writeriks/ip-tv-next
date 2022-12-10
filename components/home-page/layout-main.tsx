import React from 'react'

import { useSelector } from 'react-redux'

import SideBar from '../side-bar/side-bar'

import ContentPanel from '../content-panel/content-panel'

import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'
import uiReducerSelector from '../../store/reducers/ui-reducer/ui-reducer-selector'

import styles from '../../styles/LayoutMain.module.scss'

const LayoutMain = (): React.ReactElement => {
  const channels = useSelector(contextReducerSelector.getChannels)
  const isSideBarVisible = useSelector(uiReducerSelector.getIsSideBarVisible)
  console.log('🚀 ~ file: home-page.tsx:11 ~ LayoutMain ~ channels', channels)

  return (
    <div className={styles.layout}>
      {isSideBarVisible && <SideBar />}
      <ContentPanel />
    </div>
  )
}

export default LayoutMain

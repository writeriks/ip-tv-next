import React from 'react'

import { useSelector } from 'react-redux'

import ContentPanel from '../content-panel/content-panel'

import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'

import styles from '../../styles/LayoutMain.module.scss'
import SideBar from '../side-bar/side-bar'

const LayoutMain = (): React.ReactElement => {
  const channels = useSelector(contextReducerSelector.getChannels)
  console.log('🚀 ~ file: home-page.tsx:11 ~ LayoutMain ~ channels', channels)

  return (
    <div className={styles.layout}>
      <SideBar />
      <ContentPanel />
    </div>
  )
}

export default LayoutMain

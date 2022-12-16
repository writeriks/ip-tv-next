import React, { useState } from 'react'

import Header from './header/header'
import ChannelList from './channel-list/channel-list'

import { useSelector } from 'react-redux'

import useDraggableSideBarWidth from '../../../services/hooks/use-draggable-side-bar-width'

import contextReducerSelector from '../../../store/reducers/context-reducer/constext-reducer-selector'
import uiReducerSelector from '../../../store/reducers/ui-reducer/ui-reducer-selector'

import styles from '../../../styles/SideBar.module.scss'

const SideBar = () => {
  const isMobile = useSelector(contextReducerSelector.getIsMobile)
  const sidebarWidth = useSelector(uiReducerSelector.getIsSideBarWidth)

  const [isDragging, setIsDragging] = useState(false)
  const hookWidth = useDraggableSideBarWidth(isDragging, isMobile, setIsDragging)
  const width = hookWidth || sidebarWidth

  return (
    <div style={{ width: width }} className={styles.sideBarContainer}>
      <div className={styles.sidebarInner}>
        <Header />
        <ChannelList />
      </div>

      <div
        aria-hidden
        className={styles.dragHitbox}
        onMouseDown={() => {
          setIsDragging(true)
        }}
      >
        <div className={styles.dragHandleDivider} />
      </div>
    </div>
  )
}

export default SideBar

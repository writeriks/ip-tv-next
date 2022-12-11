import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { ArrowLeftIcon } from '@chakra-ui/icons'

import useDraggableSideBarWidth from '../../../services/hooks/use-draggable-side-bar-width'

import { setIsSideBarVisible } from '../../../store/reducers/ui-reducer/ui-slice'
import contextReducerSelector from '../../../store/reducers/context-reducer/constext-reducer-selector'
import uiReducerSelector from '../../../store/reducers/ui-reducer/ui-reducer-selector'

import styles from '../../../styles/SideBar.module.scss'
import Header from './header/header'

const SideBar = () => {
  const dispatch = useDispatch()

  const isMobile = useSelector(contextReducerSelector.getIsMobile)
  const isSideBarVisible = useSelector(uiReducerSelector.getIsSideBarVisible)
  const sidebarWidth = useSelector(uiReducerSelector.getIsSideBarWidth)

  const [isDragging, setIsDragging] = useState(false)

  const hookWidth = useDraggableSideBarWidth(isDragging, isMobile, setIsDragging)
  const width = hookWidth || sidebarWidth

  return (
    <div style={{ width: width }} className={styles.sideBarContainer}>
      <div className={styles.sidebarInner}>
        <Header />
        <div className={styles.channelListContainer}>
          <label>Channel List</label>
        </div>
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

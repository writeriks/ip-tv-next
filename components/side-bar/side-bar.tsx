import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { ArrowLeftIcon } from '@chakra-ui/icons'

import useDraggableSideBarWidth from '../../services/hooks/use-draggable-side-bar-width'

import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'

import styles from '../../styles/SideBar.module.scss'
import uiReducerSelector from '../../store/reducers/ui-reducer/ui-reducer-selector'
import { setIsSideBarVisible } from '../../store/reducers/ui-reducer/ui-slice'

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
      <div className={styles.sider}>
        <label>SideBar</label>
      </div>
      <button className={styles.hideSideBarButton} onClick={() => dispatch(setIsSideBarVisible(!isSideBarVisible))}>
        <ArrowLeftIcon />
      </button>
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

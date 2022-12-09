import React from 'react'

import { ArrowRightIcon } from '@chakra-ui/icons'

import styles from '../../styles/ContentPanel.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import uiReducerSelector from '../../store/reducers/ui-reducer/ui-reducer-selector'
import { setIsSideBarVisible } from '../../store/reducers/ui-reducer/ui-slice'

const ContentPanel = () => {
  const dispatch = useDispatch()
  const isSideBarVisible = useSelector(uiReducerSelector.getIsSideBarVisible)

  return (
    <div className={styles.contentPanelContainer}>
      {!isSideBarVisible && (
        <button className={styles.unHideSideBarButton} onClick={() => dispatch(setIsSideBarVisible(!isSideBarVisible))}>
          <ArrowRightIcon />
        </button>
      )}
      ContentPanel
    </div>
  )
}

export default ContentPanel

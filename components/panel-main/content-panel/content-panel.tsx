import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { ArrowRightIcon } from '@chakra-ui/icons'

import { setIsSideBarVisible } from '../../../store/reducers/ui-reducer/ui-slice'
import uiReducerSelector from '../../../store/reducers/ui-reducer/ui-reducer-selector'

import styles from '../../../styles/ContentPanel.module.scss'

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

      <div></div>
    </div>
  )
}

export default ContentPanel

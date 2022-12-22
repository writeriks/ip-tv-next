import React from 'react'

import ContentPanelHeader from './content-panel-header'
import ContentList from './content-list/content-list'

import styles from '../../../styles/ContentPanel.module.scss'
import { useSelector } from 'react-redux'
import channelsReducerSelector from '../../../store/reducers/channels-reducer/channels-reducer-selector'

const ContentPanel = () => {
  const selectedSerial = useSelector(channelsReducerSelector.getSelectedSerial)
  console.log('🚀 ~ file: content-panel.tsx:12 ~ ContentPanel ~ selectedSerial', selectedSerial)
  const selectedNonSerial = useSelector(channelsReducerSelector.getSelectedNonSerial)
  console.log('🚀 ~ file: content-panel.tsx:14 ~ ContentPanel ~ selectedNonSerial', selectedNonSerial)
  // if selectedNonSerial => render player pass selected object
  // if selectedSerial => render episodes with serialName

  return (
    <div className={styles.contentPanelContainer}>
      <ContentPanelHeader />
      <ContentList />
    </div>
  )
}

export default ContentPanel

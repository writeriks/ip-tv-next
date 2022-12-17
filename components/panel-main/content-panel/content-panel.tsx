import React from 'react'

import ContentPanelHeader from './content-panel-header'
import ContentList from './content-list'

import styles from '../../../styles/ContentPanel.module.scss'

const ContentPanel = () => (
  <div className={styles.contentPanelContainer}>
    <ContentPanelHeader />
    <ContentList />
  </div>
)

export default ContentPanel

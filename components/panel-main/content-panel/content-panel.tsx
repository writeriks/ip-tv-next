import React from 'react'

import ContentTitle from './content-title'

import styles from '../../../styles/ContentPanel.module.scss'
import ContentList from './content-list'

const ContentPanel = () => (
  <div className={styles.contentPanelContainer}>
    <ContentTitle />
    <ContentList />
  </div>
)

export default ContentPanel

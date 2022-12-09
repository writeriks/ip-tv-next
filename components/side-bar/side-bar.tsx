import React from 'react'

import styles from '../../styles/SideBar.module.scss'

const SideBar = () => {
  const width = 220
  return (
    <div style={{ width: width }} className={styles.sideBarContainer}>
      SideBar
    </div>
  )
}

export default SideBar

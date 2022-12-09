import React from 'react'

import { useSelector } from 'react-redux'

import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'

import playerService from '../../services/player-service/player-service'

import { mu3Link } from '../../constants'
import styles from '../../styles/LayoutMain.module.scss'

const LayoutMain = (): React.ReactElement => {
  const channels = useSelector(contextReducerSelector.getChannels)
  console.log('🚀 ~ file: home-page.tsx:11 ~ HomePage ~ channels', channels)

  const syncChannels = async () => {
    await playerService.initializeChannels(mu3Link)
  }

  return (
    <div>
      <button className={styles.syncButton} onClick={() => syncChannels()}>
        Sync
      </button>
    </div>
  )
}

export default LayoutMain

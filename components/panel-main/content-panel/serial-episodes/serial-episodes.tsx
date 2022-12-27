import React from 'react'

import { useSelector } from 'react-redux'

import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'

import styles from '../../../../styles/ContentPanel.module.scss'

const SerialEpisodes = () => {
  const selectedSerial = useSelector(channelsReducerSelector.getSelectedSerial)

  return <div className={styles.serialEpisodesContainer}>SerialEpisodes</div>
}

export default SerialEpisodes

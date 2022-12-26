import React, { useMemo } from 'react'

import { useSelector } from 'react-redux'

import { ArrowBackIcon } from '@chakra-ui/icons'

import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'

import serialEpisodesHelper from './serial-episodes-helper'

import styles from '../../../../styles/SerialEpisodes.module.scss'

const SerialEpisodes = () => {
  const selectedSerial = useSelector(channelsReducerSelector.getSelectedSerial)

  const serialDictionary = useMemo(() => serialEpisodesHelper.handleSerialSeasons(selectedSerial), [selectedSerial])

  console.log('🚀 ~ file: serial-episodes.tsx:41 ~ SerialEpisodes ~ serialDictionary', serialDictionary)

  return (
    <div className={styles.serialEpisodesContainer}>
      <button onClick={() => serialEpisodesHelper.handleBackSeasons()}>
        <ArrowBackIcon boxSize={6} />
      </button>
      SerialEpisodes
    </div>
  )
}

export default SerialEpisodes

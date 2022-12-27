import React, { useId } from 'react'

import { useSelector } from 'react-redux'

import { ArrowBackIcon } from '@chakra-ui/icons'

import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'

import headerGeneralHelper from './header-general-helper'

import styles from '../../../../styles/ContentPanel.module.scss'
import { Select } from '@chakra-ui/react'

const SerialSeasonsHeader = () => {
  const id = useId()
  const selectedSerial = useSelector(channelsReducerSelector.getSelectedSerial)
  console.log('🚀 ~ file: serial-seasons-header.tsx:17 ~ SerialSeasonsHeader ~ selectedSerial', selectedSerial)
  const seasonTitles = selectedSerial && Object.keys(selectedSerial)
  const firstEpisode = selectedSerial && seasonTitles && selectedSerial[seasonTitles[0]][0]

  return (
    <div className={styles.serialSeasonsTopBar}>
      <button className={styles.backButton} onClick={() => headerGeneralHelper.handleBackSeasons()}>
        <ArrowBackIcon boxSize={6} />
      </button>
      <div className={styles.episodeTitle}>{firstEpisode?.name.split(/ S[0-9]/)[0]}</div>

      <div className={styles.seasonSelector}>
        <Select
          defaultValue={seasonTitles ? seasonTitles[0] : 'none'}
          onChange={(e) => console.log('CHANGED ', e.target.value)}
        >
          {seasonTitles?.map((title) => (
            <option key={`${id}-${title}`} className={styles.selectOption} value={title}>
              {title}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default SerialSeasonsHeader

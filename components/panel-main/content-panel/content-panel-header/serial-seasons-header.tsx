import React, { useEffect, useId } from 'react'

import { ArrowBackIcon } from '@chakra-ui/icons'
import { Select } from '@chakra-ui/react'

import headerGeneralHelper from './header-general-helper'

import { SerialsSeasonDictionary } from '../../../../store/reducers/channels-reducer/channels-slice'

import styles from '../../../../styles/ContentPanel.module.scss'
import { useSelector } from 'react-redux'
import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'

interface SerialSeasonsHeaderProps {
  selectedSerial: SerialsSeasonDictionary
}

const SerialSeasonsHeader: React.FC<SerialSeasonsHeaderProps> = ({ selectedSerial }) => {
  const selectedSeason = useSelector(channelsReducerSelector.getSelectedSeason)
  const id = useId()
  const seasonTitles = Object.keys(selectedSerial)
  const firstEpisode = selectedSerial[seasonTitles[0]][0]
  const defaultSeason = seasonTitles[0]

  useEffect(() => {
    headerGeneralHelper.handleSeasonChange(defaultSeason)
  }, [defaultSeason])

  return (
    <div className={styles.serialSeasonsTopBar}>
      <button className={styles.backButton} onClick={() => headerGeneralHelper.handleBackSeasons()}>
        <ArrowBackIcon boxSize={6} />
      </button>
      <div className={styles.episodeTitle}>{firstEpisode?.name.split(/ S[0-9]/)[0]}</div>

      <div className={styles.seasonSelector}>
        <Select
          defaultValue={seasonTitles ? seasonTitles[0] : defaultSeason}
          onChange={({ target: { value } }) => headerGeneralHelper.handleSeasonChange(value)}
          value={selectedSeason}
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

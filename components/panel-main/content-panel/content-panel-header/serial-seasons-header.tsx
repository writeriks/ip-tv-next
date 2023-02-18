import React, { useEffect } from 'react'

import { ArrowBackIcon } from '@chakra-ui/icons'
import { Select } from '@chakra-ui/react'

import { useSelector } from 'react-redux'
import { SerialsSeasonDictionary } from '../../../../store/reducers/channels-reducer/channels-slice'
import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'

import headerGeneralHelper from './header-general-helper'

import styles from '../../../../styles/ContentPanel.module.scss'

interface SerialSeasonsHeaderProps {
  selectedSerial: SerialsSeasonDictionary
}

const SerialSeasonsHeader: React.FC<SerialSeasonsHeaderProps> = ({ selectedSerial }) => {
  const selectedSeason = useSelector(channelsReducerSelector.getSelectedSeason)
  const seasonTitles = Object.keys(selectedSerial)
  const seasonToShow = selectedSeason || seasonTitles[0]

  const firstEpisode = selectedSerial[seasonTitles[0]][0]

  useEffect(() => {
    headerGeneralHelper.handleSeasonChange(seasonToShow)
  }, [seasonToShow])

  return (
    <div className={styles.serialSeasonsTopBar}>
      <button className={styles.backButton} onClick={() => headerGeneralHelper.handleBackSeasons()}>
        <ArrowBackIcon boxSize={6} />
      </button>
      <div className={styles.episodeTitle}>{firstEpisode?.name.split(/ S[0-9]/)[0]}</div>

      <div className={styles.seasonSelector}>
        <Select
          defaultValue={seasonToShow}
          onChange={({ target: { value } }) => headerGeneralHelper.handleSeasonChange(value)}
          value={seasonToShow}
        >
          {seasonTitles?.map((title, index) => (
            <option key={`${index}-${title}`} className={styles.selectOption} value={title}>
              {title}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default SerialSeasonsHeader

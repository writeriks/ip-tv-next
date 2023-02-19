import React from 'react'

import { useSelector } from 'react-redux'

import SerialsEpisodeGrid from './serials-episode-grid'

import { SerialsSeasonDictionary } from '../../../../store/reducers/channels-reducer/channels-slice'
import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'

import styles from '../../../../styles/SerialEpisodes.module.scss'

interface SerialEpisodesProps {
  selectedSerial: SerialsSeasonDictionary
}

const SerialEpisodes: React.FC<SerialEpisodesProps> = ({ selectedSerial }) => {
  const selectedSeason = useSelector(channelsReducerSelector.getSelectedSeason) as string
  const episodesBySeason = selectedSerial[selectedSeason]

  return (
    <div className={styles.serialEpisodesContainer}>
      <SerialsEpisodeGrid episodesBySeason={episodesBySeason} />
    </div>
  )
}

export default SerialEpisodes

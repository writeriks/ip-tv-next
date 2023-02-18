import { Grid } from '@chakra-ui/react'
import React from 'react'

import { useSelector } from 'react-redux'

import EpisodeItem from './episode-item'

import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'
import { SerialsSeasonDictionary } from '../../../../store/reducers/channels-reducer/channels-slice'

import styles from '../../../../styles/SerialEpisodes.module.scss'

interface SerialEpisodesProps {
  selectedSerial: SerialsSeasonDictionary
}

const SerialEpisodes: React.FC<SerialEpisodesProps> = ({ selectedSerial }) => {
  const selectedSeason = useSelector(channelsReducerSelector.getSelectedSeason) as string
  const episodesBySeason = selectedSerial[selectedSeason]

  return (
    <div className={styles.serialEpisodesContainer}>
      <Grid templateRows="repeat(1, 1fr)" gap={1}>
        {episodesBySeason.map((episode, index) => (
          <EpisodeItem key={`${index}-${episode.name}`} episode={episode} />
        ))}
      </Grid>
    </div>
  )
}

export default SerialEpisodes

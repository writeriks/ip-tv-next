import { Grid } from '@chakra-ui/react'
import React, { useId } from 'react'

import { useSelector } from 'react-redux'

import EpisodeItem from './episode-item'

import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'
import { SerialsSeasonDictionary } from '../../../../store/reducers/channels-reducer/channels-slice'

import styles from '../../../../styles/SerialEpisodes.module.scss'

interface SerialEpisodesProps {
  selectedSerial: SerialsSeasonDictionary
}

const SerialEpisodes: React.FC<SerialEpisodesProps> = ({ selectedSerial }) => {
  const id = useId()
  const selectedSeason = useSelector(channelsReducerSelector.getSelectedSeason)
  const episodesBySeason = selectedSerial[selectedSeason]

  return (
    <div className={styles.serialEpisodesContainer}>
      <Grid templateRows="repeat(1, 1fr)" gap={1}>
        {episodesBySeason.map((episode) => (
          <EpisodeItem key={`${id}-${episode.name}`} episode={episode} />
        ))}
      </Grid>
    </div>
  )
}

export default SerialEpisodes

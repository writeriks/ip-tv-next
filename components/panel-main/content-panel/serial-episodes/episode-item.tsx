import React from 'react'

import { GridItem, Img, Text } from '@chakra-ui/react'

import { PlaylistItem } from 'iptv-playlist-parser'

import styles from '../../../../styles/SerialEpisodes.module.scss'
import serialEpisodesHelper from './serial-episodes-helper'

interface EpisodeItemProps {
  episode: PlaylistItem
}

const EpisodeItem: React.FC<EpisodeItemProps> = ({ episode }) => {
  return (
    <GridItem
      className={styles.episodeContainer}
      w="100%"
      h="150"
      onClick={() => serialEpisodesHelper.handleSelectedEpisode(episode)}
    >
      <div className={styles.imageContainer}>
        <Img src={episode.tvg.logo} loading="lazy" />
      </div>
      <Text fontSize="xl">{episode.name}</Text>
    </GridItem>
  )
}

export default EpisodeItem

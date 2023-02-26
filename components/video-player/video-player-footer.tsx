import React from 'react'

import { Button } from '@chakra-ui/react'

import useGetSiblingEpisodes from '../../services/hooks/use-get-sibling-episodes'

import videoPlayerHelper from './video-player-helper'

import styles from '../../styles/VideoPlayer.module.scss'

const VideoPlayerFooter = () => {
  const { nextEpisode, previousEpisode } = useGetSiblingEpisodes()

  return (
    <div className={styles.videoPlayerFooter}>
      {previousEpisode && (
        <Button onClick={() => videoPlayerHelper.handleSelectedEpisode(previousEpisode)}>
          <label>Previous Episode</label>
        </Button>
      )}
      {nextEpisode && (
        <Button onClick={() => videoPlayerHelper.handleSelectedEpisode(nextEpisode)}>
          <label>Next Episode</label>
        </Button>
      )}
    </div>
  )
}

export default VideoPlayerFooter

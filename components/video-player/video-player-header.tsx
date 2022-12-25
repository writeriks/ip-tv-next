import React from 'react'

import { ArrowBackIcon } from '@chakra-ui/icons'

import styles from '../../styles/VideoPlayer.module.scss'
import videoPlayerHelper from './video-player-helper'

interface VideoPlayerHeaderProps {
  playlistItemName: string
}

const VideoPlayerHeader: React.FC<VideoPlayerHeaderProps> = ({ playlistItemName }) => {
  return (
    <div className={styles.playlistItemHeader}>
      <button onClick={() => videoPlayerHelper.onHeaderBackClick()}>
        <ArrowBackIcon boxSize={6} />
      </button>
      <div className={styles.playItemTitle}>{playlistItemName}</div>
    </div>
  )
}

export default VideoPlayerHeader

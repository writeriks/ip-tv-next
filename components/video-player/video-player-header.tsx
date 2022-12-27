import React from 'react'

import { useSelector } from 'react-redux'

import { ArrowBackIcon } from '@chakra-ui/icons'

import channelsReducerSelector from '../../store/reducers/channels-reducer/channels-reducer-selector'

import videoPlayerHelper from './video-player-helper'

import styles from '../../styles/VideoPlayer.module.scss'

interface VideoPlayerHeaderProps {
  playlistItemName: string
}

const VideoPlayerHeader: React.FC<VideoPlayerHeaderProps> = ({ playlistItemName }) => {
  const selectedEpisode = useSelector(channelsReducerSelector.getSelectedSerialEpisode)
  return (
    <div className={styles.playlistItemHeader}>
      <button onClick={() => videoPlayerHelper.onHeaderBackClick(selectedEpisode)}>
        <ArrowBackIcon boxSize={6} />
      </button>
      <div className={styles.playItemTitle}>{playlistItemName}</div>
    </div>
  )
}

export default VideoPlayerHeader

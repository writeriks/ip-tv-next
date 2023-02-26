import React from 'react'

import VideoPlayerHeader from './video-player-header'
import VideoPlayerFooter from './video-player-footer'
import VideoPlayerBody from './video-player-body'

import parser from 'iptv-playlist-parser'

import styles from '../../styles/VideoPlayer.module.scss'

interface VideoPlayerProps {
  playlistItem: parser.PlaylistItem
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playlistItem }) => {
  return (
    <div className={styles.videoPlayerContainer}>
      <VideoPlayerHeader playlistItemName={playlistItem.name} />
      <VideoPlayerBody playlistItem={playlistItem} />
      <VideoPlayerFooter />
    </div>
  )
}

export default VideoPlayer

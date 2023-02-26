import dynamic from 'next/dynamic'
import React from 'react'
import { useSelector } from 'react-redux'
import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'
import { selectedCategory } from '../../store/reducers/context-reducer/context-slice'
import videoPlayerHelper from './video-player-helper'
import parser from 'iptv-playlist-parser'
import styles from '../../styles/VideoPlayer.module.scss'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface VideoPlayerBodyProps {
  playlistItem: parser.PlaylistItem
}

const VideoPlayerBody: React.FC<VideoPlayerBodyProps> = ({ playlistItem }) => {
  const isMobile = useSelector(contextReducerSelector.getIsMobile)
  const category = useSelector(contextReducerSelector.getSelectedCategory) as selectedCategory

  const playlistUrl = videoPlayerHelper.getPlayUrl(playlistItem.url, category)
  return (
    <div className={styles.vidoePlayerBody}>
      {/* mp4 for mobile and web, m3u8 only for mobile */}
      {isMobile || category !== selectedCategory.LIVE ? (
        <video className={styles.videoPlayer} src={playlistUrl} controls autoPlay={false}></video>
      ) : (
        <ReactPlayer
          url={playlistUrl}
          controls
          playing={false}
          width="100%"
          height="50%"
          config={{
            file: {
              forceVideo: true,
              attributes: {
                crossOrigin: 'anonymous',
              },
            },
          }}
        />
      )}
    </div>
  )
}

export default VideoPlayerBody

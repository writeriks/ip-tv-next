import React from 'react'

import dynamic from 'next/dynamic'
import { url3 } from '../../constants'
import { useSelector } from 'react-redux'
import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const VideoPlayer = (): React.ReactElement => {
  const isMobile = useSelector(contextReducerSelector.getIsMobile)
  console.log('🚀 ~ file: vidoe-player.tsx:11 ~ VideoPlayer ~ isMobile', isMobile)

  return (
    <div>
      {/* mp4 for mobile and web, m3u8 only for mobile */}
      {isMobile ? (
        <video src={url3} controls autoPlay width="50%" height="25%"></video>
      ) : (
        <ReactPlayer
          url={url3}
          controls
          playing
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

export default VideoPlayer

import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import { url3 } from '../../constants'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const VideoPlayer = (): React.ReactElement => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof navigator.userAgent != 'undefined') {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log('MOBILEEE')
        setIsMobile(true)
      } else {
        setIsMobile(false)
        console.log('NOT MOBILEEE')
      }
    }
  }, [])

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

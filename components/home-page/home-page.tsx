import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { mu3Link } from '../../constants'
import playerService from '../../services/player-service/player-service'

import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'
import VideoPlayer from '../video-player/vidoe-player'

const HomePage = (): React.ReactElement => {
  const channels = useSelector(contextReducerSelector.getChannels)
  console.log('🚀 ~ file: home-page.tsx:11 ~ HomePage ~ channels', channels)

  useEffect(() => {
    const addChannels = async (): Promise<void> => {
      if (Object.keys(channels).length === 0) {
        await playerService.initializeChannels(mu3Link)
      }
    }
    addChannels()
  }, [channels])

  return (
    <div>
      <VideoPlayer />
    </div>
  )
}

export default HomePage

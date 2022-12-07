import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { mu3Link } from '../../constants'
import playerService from '../../services/player-service/player-service'

import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'
import { Button } from '@chakra-ui/react'

const HomePage = (): React.ReactElement => {
  const channels = useSelector(contextReducerSelector.getChannels)
  console.log('🚀 ~ file: home-page.tsx:11 ~ HomePage ~ channels', channels)

  const syncChannels = async () => {
    await playerService.initializeChannels(mu3Link)
  }

  return (
    <div className="home-page">
      <Button className="sync-button" colorScheme="teal" size="lg" variant="ghost" onClick={() => syncChannels()}>
        Sync
      </Button>
    </div>
  )
}

export default HomePage

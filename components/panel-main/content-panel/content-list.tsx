import React from 'react'
import { useSelector } from 'react-redux'

import channelsReducerSelector from '../../../store/reducers/channels-reducer/channels-reducer-selector'
import contextReducerSelector from '../../../store/reducers/context-reducer/constext-reducer-selector'

import playerService from '../../../services/player-service/player-service'

const ContentList = () => {
  const selectedTitle = useSelector(contextReducerSelector.getSelectedTitle)
  const category = useSelector(contextReducerSelector.getSelectedCategory)

  const playlistSelectorName = playerService.getSelectedPlaylist(category)
  const playlist = useSelector(channelsReducerSelector[playlistSelectorName])
  const playlistBySelectedTitle = playlist[selectedTitle]

  console.log('🚀 ~ file: content-list.tsx:14 ~ ContentList ~ playlistBySelectedTitle', playlistBySelectedTitle)

  return <div>ContentList</div>
}

export default ContentList

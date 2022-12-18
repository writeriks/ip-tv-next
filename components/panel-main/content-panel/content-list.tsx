import React from 'react'
import { useSelector } from 'react-redux'

import channelsReducerSelector from '../../../store/reducers/channels-reducer/channels-reducer-selector'
import contextReducerSelector from '../../../store/reducers/context-reducer/constext-reducer-selector'

import playerService from '../../../services/player-service/player-service'
import { selectedCategory } from '../../../store/reducers/context-reducer/context-slice'

const ContentList = () => {
  const selectedTitle = useSelector(contextReducerSelector.getSelectedTitle)
  const category = useSelector(contextReducerSelector.getSelectedCategory)
  const isSeries = category === selectedCategory.SERIES

  const playlistSelectorName = playerService.getSelectedPlaylist(category)
  const playlist = useSelector(channelsReducerSelector[playlistSelectorName])
  const parsedSeries = useSelector(channelsReducerSelector.getParsedSeries)

  const playlistBySelectedTitle = isSeries ? parsedSeries[selectedTitle] : playlist[selectedTitle]
  console.log('🚀 ~ file: content-list.tsx:20 ~ ContentList ~ playlistBySelectedTitle', playlistBySelectedTitle)

  return <div>ContentList</div>
}

export default ContentList

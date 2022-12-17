import React from 'react'
import { useSelector } from 'react-redux'
import playerService from '../../../services/player-service/player-service'
import channelsReducerSelector from '../../../store/reducers/channels-reducer/channels-reducer-selector'
import contextReducerSelector from '../../../store/reducers/context-reducer/constext-reducer-selector'

const ContentList = () => {
  const selectedTitle = useSelector(contextReducerSelector.getSelectedTitle)
  const selectedCategory = useSelector(contextReducerSelector.getSelectedCategory)

  const playlistSelectorName = playerService.getSelectedPlaylist(selectedCategory)
  const playlist = useSelector(channelsReducerSelector[playlistSelectorName])
  const playlistByTitle = playlist[selectedTitle]

  return <div>ContentList</div>
}

export default ContentList

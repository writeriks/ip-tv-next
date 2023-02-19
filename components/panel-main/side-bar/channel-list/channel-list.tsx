import React, { useMemo } from 'react'

import { useSelector } from 'react-redux'

import ChannelsGrid from './channels-grid'

import { selectedCategory } from '../../../../store/reducers/context-reducer/context-slice'
import contextReducerSelector from '../../../../store/reducers/context-reducer/constext-reducer-selector'
import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'
import uiReducerSelector from '../../../../store/reducers/ui-reducer/ui-reducer-selector'

import playerService from '../../../../services/player-service/player-service'

import styles from '../../../../styles/ChannelList.module.scss'

const ChannelList = () => {
  const category = useSelector(contextReducerSelector.getSelectedCategory)
  const selectedTitle = useSelector(contextReducerSelector.getSelectedTitle)

  const sideBarWidth = useSelector(uiReducerSelector.getIsSideBarWidth)

  const playlistSelectorNameForLiveAndMovies = useMemo(
    () => playerService.getSelectedPlaylistSelector(category),
    [category]
  )
  const playlist = useSelector(channelsReducerSelector[playlistSelectorNameForLiveAndMovies])
  const parsedSeries = useSelector(channelsReducerSelector.getParsedSeries)

  const isSeries = category === selectedCategory.SERIES
  const playlistTitles = useMemo(
    () => (isSeries ? Object.keys(parsedSeries) : Object.keys(playlist)),
    [isSeries, parsedSeries, playlist]
  )

  return (
    <div className={styles.channelListContainer}>
      <ChannelsGrid playlistTitles={playlistTitles} selectedTitle={selectedTitle} sideBarWidth={sideBarWidth} />
    </div>
  )
}

export default ChannelList

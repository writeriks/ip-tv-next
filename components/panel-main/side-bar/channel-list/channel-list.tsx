import React, { useId, useMemo } from 'react'

import { Grid } from '@chakra-ui/react'

import { useSelector } from 'react-redux'

import ChannelListItem from './channel-list-item'

import playerService from '../../../../services/player-service/player-service'

import contextReducerSelector from '../../../../store/reducers/context-reducer/constext-reducer-selector'
import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'
import uiReducerSelector from '../../../../store/reducers/ui-reducer/ui-reducer-selector'

import { selectedCategory } from '../../../../store/reducers/context-reducer/context-slice'

import styles from '../../../../styles/ChannelList.module.scss'

const ChannelList = () => {
  const id = useId()
  const category = useSelector(contextReducerSelector.getSelectedCategory)
  const selectedTitle = useSelector(contextReducerSelector.getSelectedTitle)

  const sidebarWidth = useSelector(uiReducerSelector.getIsSideBarWidth)

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
      <Grid templateRows={`repeat(${playlistTitles.length}, 1fr)`} gap={1}>
        {playlistTitles.map((title) => (
          <ChannelListItem
            key={`${id}--${title}`}
            selectedTitle={selectedTitle}
            title={title}
            sidebarWidth={sidebarWidth}
          />
        ))}
      </Grid>
    </div>
  )
}

export default ChannelList

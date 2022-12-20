import React, { useId, useMemo } from 'react'

import { Grid, GridItem } from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'

import playerService from '../../../../services/player-service/player-service'

import contextReducerSelector from '../../../../store/reducers/context-reducer/constext-reducer-selector'
import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'
import uiReducerSelector from '../../../../store/reducers/ui-reducer/ui-reducer-selector'

import { selectedCategory, setSelectedTitle } from '../../../../store/reducers/context-reducer/context-slice'

import styles from '../../../../styles/ChannelList.module.scss'

const SCROLL_BAR_WIDTH = 20

const ChannelList = () => {
  const dispatch = useDispatch()

  const category = useSelector(contextReducerSelector.getSelectedCategory)
  const selectedTitle = useSelector(contextReducerSelector.getSelectedTitle)

  const sidebarWidth = useSelector(uiReducerSelector.getIsSideBarWidth)

  const playlistSelectorNameForLiveAndMovies = playerService.getSelectedPlaylist(category)
  const playlist = useSelector(channelsReducerSelector[playlistSelectorNameForLiveAndMovies])
  const parsedSeries = useSelector(channelsReducerSelector.getParsedSeries)

  const isSeries = category === selectedCategory.SERIES
  const playlistTitles = useMemo(
    () => (isSeries ? Object.keys(parsedSeries) : Object.keys(playlist)),
    [isSeries, parsedSeries, playlist]
  )

  const id = useId()

  return (
    <div className={styles.channelListContainer}>
      <Grid templateRows={`repeat(${playlistTitles.length}, 1fr)`} gap={1}>
        {playlistTitles.map((title) => (
          <GridItem
            className={styles.gridItem}
            key={`${id}--${title}`}
            w="100%"
            h="100%"
            bg={title === selectedTitle ? '#010242' : '#404186'}
          >
            <button
              style={{ width: sidebarWidth - SCROLL_BAR_WIDTH }}
              onClick={() => dispatch(setSelectedTitle(title))}
            >
              {title}
            </button>
          </GridItem>
        ))}
      </Grid>
    </div>
  )
}

export default ChannelList

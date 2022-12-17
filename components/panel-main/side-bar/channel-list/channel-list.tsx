import React, { useId } from 'react'

import { Grid, GridItem } from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'

import playerService from '../../../../services/player-service/player-service'

import contextReducerSelector from '../../../../store/reducers/context-reducer/constext-reducer-selector'
import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'

import { setSelectedTitle } from '../../../../store/reducers/context-reducer/context-slice'

import styles from '../../../../styles/ChannelList.module.scss'

const ChannelList = () => {
  const dispatch = useDispatch()
  const selectedCategory = useSelector(contextReducerSelector.getSelectedCategory)
  const playlistSelectorName = playerService.getSelectedPlaylist(selectedCategory)
  const playlist = useSelector(channelsReducerSelector[playlistSelectorName])
  const playlistTitles = Object.keys(playlist)

  const id = useId()

  return (
    <div className={styles.channelListContainer}>
      <Grid templateRows={`repeat(${playlistTitles.length}, 1fr)`} gap={1}>
        {playlistTitles.map((title) => (
          <GridItem className={styles.gridItem} key={`${id}--${title}`} w="100%" h="100%" bg="#404186">
            <button onClick={() => dispatch(setSelectedTitle(title))}>{title}</button>
          </GridItem>
        ))}
      </Grid>
    </div>
  )
}

export default ChannelList

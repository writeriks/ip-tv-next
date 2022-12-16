import React, { useId, useMemo } from 'react'

import { Grid, GridItem } from '@chakra-ui/react'

import { useSelector } from 'react-redux'

import sideBarHelper from '../side-bar-helper'

import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'
import contextReducerSelector from '../../../../store/reducers/context-reducer/constext-reducer-selector'

import styles from '../../../../styles/ChannelList.module.scss'

const ChannelList = () => {
  const selectedCategory = useSelector(contextReducerSelector.getSelectedCategory)
  const selectorName = sideBarHelper.getSelectedPlaylistName(selectedCategory)
  const playlist = useSelector(channelsReducerSelector[selectorName])
  const id = useId()

  const selectedTitles = useMemo(() => sideBarHelper.getTitles(playlist), [playlist])

  return (
    <div className={styles.channelListContainer}>
      <Grid templateRows={`repeat(${selectedTitles.length}, 1fr)`} gap={1}>
        {selectedTitles.map((title) => (
          <GridItem className={styles.gridItem} key={`${id}--${title}`} w="100%" h="100%" bg="#404186">
            <button onClick={console.log}>{title}</button>
          </GridItem>
        ))}
      </Grid>
    </div>
  )
}

export default ChannelList

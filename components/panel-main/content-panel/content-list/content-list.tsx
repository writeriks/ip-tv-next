import React, { useId, useMemo } from 'react'

import { Grid } from '@chakra-ui/react'
import ContentItem from './content-item'

import { useSelector } from 'react-redux'

import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'
import contextReducerSelector from '../../../../store/reducers/context-reducer/constext-reducer-selector'

import playerService from '../../../../services/player-service/player-service'
import { selectedCategory } from '../../../../store/reducers/context-reducer/context-slice'

import { ParsedSerialTitles } from '../../../../store/reducers/channels-reducer/channels-slice'
import { PlaylistItem } from 'iptv-playlist-parser'

import styles from '../../../../styles/ContentList.module.scss'

const ContentList = () => {
  const id = useId()

  const isMobile = useSelector(contextReducerSelector.getIsMobile)

  const repeatedColumns = isMobile ? 3 : 5

  const selectedTitle = useSelector(contextReducerSelector.getSelectedTitle)
  const category = useSelector(contextReducerSelector.getSelectedCategory)

  const playlistSelectorName = playerService.getSelectedPlaylist(category)
  const playlist = useSelector(channelsReducerSelector[playlistSelectorName])
  const parsedSeries = useSelector(channelsReducerSelector.getParsedSeries)

  const isSeries = category === selectedCategory.SERIES
  const playlistBySelectedTitle = useMemo(
    () => (isSeries ? parsedSeries[selectedTitle] : playlist[selectedTitle]),
    [isSeries, parsedSeries, playlist, selectedTitle]
  )

  const mappedPlaylist = (): React.ReactNode => {
    if (playlistBySelectedTitle) {
      if (isSeries) {
        return Object.values(playlistBySelectedTitle as ParsedSerialTitles).map((playlistItem) => (
          <ContentItem key={`${id}-${playlistItem[0].name}`} playlistItem={playlistItem[0]} />
        ))
      } else {
        return (playlistBySelectedTitle as PlaylistItem[]).map((playlistItem) => (
          <ContentItem key={`${id}-${playlistItem.name}`} playlistItem={playlistItem} />
        ))
      }
    }
  }
  console.log('🚀 ~ file: content-list.tsx:20 ~ ContentList ~ playlistBySelectedTitle', playlistBySelectedTitle)

  return (
    <div className={styles.ContentListContainer}>
      <Grid templateColumns={`repeat(${repeatedColumns}, 1fr)`} gap={1}>
        {mappedPlaylist()}
      </Grid>
    </div>
  )
}

export default ContentList

import React, { useMemo } from 'react'

import { Grid } from '@chakra-ui/react'

import { useSelector } from 'react-redux'

import SeriesList from './series-list'
import ChannelsAndMoviesList from './channels-and-movies-list'

import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'
import contextReducerSelector from '../../../../store/reducers/context-reducer/constext-reducer-selector'

import playerService from '../../../../services/player-service/player-service'
import contentListHelper from './content-list-helper'

import { selectedCategory } from '../../../../store/reducers/context-reducer/context-slice'
import { ParsedSerialTitles } from '../../../../store/reducers/channels-reducer/channels-slice'

import { PlaylistItem } from 'iptv-playlist-parser'

import styles from '../../../../styles/ContentList.module.scss'

const ContentList = () => {
  const isMobile = useSelector(contextReducerSelector.getIsMobile)

  const selectedTitle = useSelector(contextReducerSelector.getSelectedTitle)
  const category = useSelector(contextReducerSelector.getSelectedCategory)

  const playlistSelectorName = useMemo(() => playerService.getSelectedPlaylistSelector(category), [category])
  const parsedNonSerials = useSelector(channelsReducerSelector[playlistSelectorName])
  const parsedSeries = useSelector(channelsReducerSelector.getParsedSeries)
  const searchText = useSelector(contextReducerSelector.getSearchText)

  const isSeries = category === selectedCategory.SERIES
  const playlistBySelectedTitle = useMemo(
    () => contentListHelper.getPlaylistByTitle(isSeries, selectedTitle, parsedSeries, parsedNonSerials, searchText),
    [isSeries, parsedSeries, parsedNonSerials, selectedTitle, searchText]
  )

  const numberOfContentColumns = isMobile ? 3 : 5

  const contentsToRender = (): React.ReactNode => {
    if (playlistBySelectedTitle) {
      if (isSeries) {
        return <SeriesList serials={playlistBySelectedTitle as ParsedSerialTitles} />
      } else {
        return <ChannelsAndMoviesList channelsOrMovies={playlistBySelectedTitle as PlaylistItem[]} />
      }
    }
  }

  return (
    <div className={styles.ContentListContainer}>
      <Grid templateColumns={`repeat(${numberOfContentColumns}, 1fr)`} gap={1}>
        {contentsToRender()}
      </Grid>
    </div>
  )
}

export default ContentList

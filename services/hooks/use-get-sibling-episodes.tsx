import { useMemo } from 'react'

import { useSelector } from 'react-redux'

import videoPlayerHelper from '../../components/video-player/video-player-helper'

import channelsReducerSelector from '../../store/reducers/channels-reducer/channels-reducer-selector'
import contextReducerSelector from '../../store/reducers/context-reducer/constext-reducer-selector'

import parser from 'iptv-playlist-parser'

interface SiblingEpisodes {
  nextEpisode: parser.PlaylistItem | null
  previousEpisode: parser.PlaylistItem | null
}

const useGetSiblingEpisodes = (): SiblingEpisodes => {
  const selectedSerialEpisode = useSelector(channelsReducerSelector.getSelectedSerialEpisode)
  const parsedSerials = useSelector(channelsReducerSelector.getParsedSeries)
  const selectedTitle = useSelector(contextReducerSelector.getSelectedTitle)

  const nextEpisode = useMemo(() => {
    if (selectedSerialEpisode) {
      return videoPlayerHelper.getSerialNextEpisode(parsedSerials, selectedSerialEpisode, selectedTitle)
    }
    return null
  }, [parsedSerials, selectedSerialEpisode, selectedTitle])

  const previousEpisode = useMemo(() => {
    if (selectedSerialEpisode) {
      return videoPlayerHelper.getSerialPreviousEpisode(parsedSerials, selectedSerialEpisode, selectedTitle)
    }
    return null
  }, [parsedSerials, selectedSerialEpisode, selectedTitle])

  return { nextEpisode: nextEpisode, previousEpisode: previousEpisode }
}

export default useGetSiblingEpisodes

import React from 'react'

import { useSelector } from 'react-redux'

import ContentList from './content-list/content-list'
import SerialEpisodes from './serial-episodes/serial-episodes'
import VideoPlayer from '../../video-player/video-player'
import HeaderGeneral from './content-panel-header/header-general'

import channelsReducerSelector from '../../../store/reducers/channels-reducer/channels-reducer-selector'

import { PlaylistItem } from 'iptv-playlist-parser'

import styles from '../../../styles/ContentPanel.module.scss'

const ContentPanel = () => {
  const selectedNonSerial = useSelector(channelsReducerSelector.getSelectedNonSerial)
  const selectedSerial = useSelector(channelsReducerSelector.getSelectedSerial)
  const selectedSerialEpisode = useSelector(channelsReducerSelector.getSelectedSerialEpisode)
  const selectedSeason = useSelector(channelsReducerSelector.getSelectedSeason)

  const contentToRender = () => {
    if (selectedNonSerial || selectedSerialEpisode) {
      const selectedItem = selectedNonSerial || selectedSerialEpisode
      return <VideoPlayer playlistItem={selectedItem as PlaylistItem} />
    } else if (selectedSerial && selectedSeason) {
      return <SerialEpisodes selectedSerial={selectedSerial} />
    } else {
      return <ContentList />
    }
  }

  return (
    <div className={styles.contentPanelContainer}>
      <HeaderGeneral />
      {contentToRender()}
    </div>
  )
}

export default ContentPanel

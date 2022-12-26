import React from 'react'

import { useSelector } from 'react-redux'

import ContentPanelHeader from './content-panel-header'
import ContentList from './content-list/content-list'
import SerialEpisodes from './serial-episodes/serial-episodes'
import VideoPlayer from '../../video-player/video-player'

import channelsReducerSelector from '../../../store/reducers/channels-reducer/channels-reducer-selector'

import styles from '../../../styles/ContentPanel.module.scss'
import { PlaylistItem } from 'iptv-playlist-parser'

const ContentPanel = () => {
  const selectedNonSerial = useSelector(channelsReducerSelector.getSelectedNonSerial)
  const selectedSerial = useSelector(channelsReducerSelector.getSelectedSerial)
  const selectedSerialEpisode = useSelector(channelsReducerSelector.getSelectedSerialEpisode)

  // if selectedNonSerial => render player pass selected object
  // if selectedSerial => render episodes with serialName

  const contentToRender = () => {
    if (selectedSerial) {
      return <SerialEpisodes />
    } else if (selectedNonSerial || selectedSerialEpisode) {
      const selectedItem = selectedNonSerial || selectedSerialEpisode
      return <VideoPlayer playlistItem={selectedItem as PlaylistItem} />
    } else {
      return <ContentList />
    }
  }

  return (
    <div className={styles.contentPanelContainer}>
      <ContentPanelHeader />
      {contentToRender()}
    </div>
  )
}

export default ContentPanel

import React from 'react'

import { useSelector } from 'react-redux'

import ContentPanelHeader from './content-panel-header'
import ContentList from './content-list/content-list'
import SerialEpisodes from './serial-episodes/serial-episodes'
import VideoPlayer from '../../video-player/video-player'

import channelsReducerSelector from '../../../store/reducers/channels-reducer/channels-reducer-selector'

import styles from '../../../styles/ContentPanel.module.scss'

const ContentPanel = () => {
  const selectedSerial = useSelector(channelsReducerSelector.getSelectedSerial)
  const selectedNonSerial = useSelector(channelsReducerSelector.getSelectedNonSerial)

  // if selectedNonSerial => render player pass selected object
  // if selectedSerial => render episodes with serialName

  const contentToRender = () => {
    if (selectedSerial) {
      // TODO: render episodes
      return <SerialEpisodes />
    } else if (selectedNonSerial) {
      return <VideoPlayer playlistItem={selectedNonSerial} />
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

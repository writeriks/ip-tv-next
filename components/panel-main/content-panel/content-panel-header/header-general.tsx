import React from 'react'
import { useSelector } from 'react-redux'

import { HamburgerIcon } from '@chakra-ui/icons'
import ContentPanelHeader from './content-panel-header'
import SerialSeasonsHeader from './serial-seasons-header'

import channelsReducerSelector from '../../../../store/reducers/channels-reducer/channels-reducer-selector'
import uiReducerSelector from '../../../../store/reducers/ui-reducer/ui-reducer-selector'

import headerGeneralHelper from './header-general-helper'

import styles from '../../../../styles/ContentPanel.module.scss'

const HeaderGeneral = () => {
  const selectedSerial = useSelector(channelsReducerSelector.getSelectedSerial)
  const selectedEpisode = useSelector(channelsReducerSelector.getSelectedSerialEpisode)
  const isSideBarVisible = useSelector(uiReducerSelector.getIsSideBarVisible)

  const renderHeader = () => {
    if (selectedSerial && !selectedEpisode) {
      return <SerialSeasonsHeader selectedSerial={selectedSerial} />
    }
    return <ContentPanelHeader />
  }

  return (
    <div className={styles.topBarContainer}>
      {!isSideBarVisible && (
        <button
          className={styles.unHideSideBarButton}
          onClick={() => headerGeneralHelper.handleSideBarVisible(!isSideBarVisible)}
        >
          <HamburgerIcon boxSize={6} />
        </button>
      )}
      {renderHeader()}
    </div>
  )
}

export default HeaderGeneral

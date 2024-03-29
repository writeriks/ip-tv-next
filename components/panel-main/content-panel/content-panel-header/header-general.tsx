import React from 'react'
import { useSelector } from 'react-redux'

import ContentPanelHeader from './content-panel-header'
import SerialSeasonsHeader from './serial-seasons-header'
import HamburgerButton from './hamburger-button'

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
        <HamburgerButton
          className={styles.unHideSideBarButton}
          onClick={() => headerGeneralHelper.handleSideBarVisible(!isSideBarVisible)}
        />
      )}
      {renderHeader()}
    </div>
  )
}

export default HeaderGeneral

import React from 'react'

import { useDispatch } from 'react-redux'

import { RepeatIcon, SettingsIcon } from '@chakra-ui/icons'

import { openLoginModal } from '../../../store/reducers/ui-reducer/ui-slice'

import styles from '../../../styles/LandingPage.module.scss'

const LandingHeader = () => {
  const dispatch = useDispatch()

  return (
    <div className={styles.landingHeaderContainer}>
      <div className={styles.headerTitle}>
        <label>M3U Player</label>
      </div>
      <div className={styles.headerConfiguration}>
        <div className={styles.syncButtonContainer}>
          <button>
            <RepeatIcon boxSize={6} />
          </button>
        </div>
        <div className={styles.settingsButtonContainer}>
          <button onClick={() => dispatch(openLoginModal())}>
            <SettingsIcon boxSize={6} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingHeader

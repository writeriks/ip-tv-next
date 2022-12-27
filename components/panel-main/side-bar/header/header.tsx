import React from 'react'

import { useDispatch } from 'react-redux'

import Lottie from 'react-lottie'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { SmallCloseIcon } from '@chakra-ui/icons'

import { setSelectedCategory, setSelectedTitle } from '../../../../store/reducers/context-reducer/context-slice'

import * as ipTvLogoAnimation from '../../../../public/assets/ip-tv-logo-animation.json'
import { defaultAnimationProps } from '../../../../services/common/lottie-service'

import styles from '../../../../styles/SideBar.module.scss'
import { setIsSideBarVisible } from '../../../../store/reducers/ui-reducer/ui-slice'
import {
  setSelectedNonSerial,
  setSelectedSerial,
  setSelectedSerialEpisode,
} from '../../../../store/reducers/channels-reducer/channels-slice'

const Header = () => {
  const dispatch = useDispatch()
  const onBackItemClick = async () => {
    await Promise.all([
      dispatch(setSelectedCategory(null)),
      dispatch(setSelectedTitle('')),
      dispatch(setSelectedSerial(null)),
      dispatch(setSelectedNonSerial(null)),
      dispatch(setSelectedSerialEpisode(null)),
    ])
  }

  return (
    <div className={styles.header}>
      <button onClick={() => onBackItemClick()}>
        <ArrowBackIcon boxSize={6} />
      </button>
      <div className={styles.logoAnimation}>
        <Lottie options={defaultAnimationProps(ipTvLogoAnimation)} isClickToPauseDisabled={true} />
      </div>
      <button onClick={() => dispatch(setIsSideBarVisible(false))}>
        <SmallCloseIcon boxSize={6} />
      </button>
    </div>
  )
}

export default Header

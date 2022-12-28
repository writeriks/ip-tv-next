import React from 'react'

import Lottie from 'react-lottie'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { SmallCloseIcon } from '@chakra-ui/icons'

import * as ipTvLogoAnimation from '../../../../public/assets/ip-tv-logo-animation.json'
import { defaultAnimationProps } from '../../../../services/common/lottie-service'

import sideBarHelper from '../side-bar-helper'

import styles from '../../../../styles/SideBar.module.scss'

const Header = () => (
  <div className={styles.header}>
    <button onClick={() => sideBarHelper.onBackItemClick()}>
      <ArrowBackIcon boxSize={6} />
    </button>
    <div className={styles.logoAnimation}>
      <Lottie options={defaultAnimationProps(ipTvLogoAnimation)} isClickToPauseDisabled={true} />
    </div>
    <button onClick={() => sideBarHelper.hideSideBar()}>
      <SmallCloseIcon boxSize={6} />
    </button>
  </div>
)

export default Header

import React from 'react'

import Lottie from 'react-lottie'
import * as loadingAnimationData from '../../public/assets/loading-animation.json'
import { defaultAnimationProps } from '../../services/common/lottie-service'

import styles from '../../styles/Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loadingMain}>
      <div className={styles.loadingInner}>
        <Lottie options={defaultAnimationProps(loadingAnimationData)} isClickToPauseDisabled={true} width={300} height={300} />
      </div>
    </div>
  )
}

export default Loading

import React from 'react'

import { GridItem } from '@chakra-ui/react'

import sideBarHelper from '../side-bar-helper'

import styles from '../../../../styles/ChannelList.module.scss'

interface ChannelListItemProps {
  title: string
  selectedTitle: string
  sidebarWidth: number
}

const SCROLL_BAR_WIDTH = 20

const ChannelListItem: React.FC<ChannelListItemProps> = ({ title, selectedTitle, sidebarWidth }) => (
  <>
    <GridItem className={styles.gridItem} w="100%" h="100%" bg={title === selectedTitle ? '#010242' : '#404186'}>
      <button
        style={{ width: sidebarWidth - SCROLL_BAR_WIDTH }}
        onClick={() => sideBarHelper.handleChannelSelect(title)}
      >
        {title}
      </button>
    </GridItem>
  </>
)

export default ChannelListItem

import React from 'react'

import { PlaylistItem } from 'iptv-playlist-parser'

import { GridItem, Img } from '@chakra-ui/react'

import styles from '../../../../styles/ContentList.module.scss'

interface ContentItemProps {
  playlistItem: PlaylistItem | PlaylistItem[]
}

const ContentItem: React.FC<ContentItemProps> = ({ playlistItem }) => {
  return (
    <GridItem className={styles.GridItem} w="200" h="20">
      <Img src={(playlistItem as PlaylistItem).tvg.logo} />
      <p>{(playlistItem as PlaylistItem).name.split(/ S[0-9]/)[0]}</p>
    </GridItem>
  )
}

export default ContentItem

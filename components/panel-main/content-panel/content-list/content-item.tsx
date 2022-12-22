import React from 'react'

import { PlaylistItem } from 'iptv-playlist-parser'

import { GridItem, Img } from '@chakra-ui/react'

import styles from '../../../../styles/ContentList.module.scss'

interface ContentItemProps {
  playlistItem: PlaylistItem | PlaylistItem[]
  onClickCallback: () => void
}

const ContentItem: React.FC<ContentItemProps> = ({ playlistItem, onClickCallback }) => {
  return (
    <GridItem className={styles.GridItem} w="200" h="20" onClick={onClickCallback}>
      <Img src={(playlistItem as PlaylistItem).tvg.logo} />
      <p>{(playlistItem as PlaylistItem).name.split(/ S[0-9]/)[0]}</p>
    </GridItem>
  )
}

export default ContentItem

import React from 'react'

import { Grid } from '@chakra-ui/react'
import ChannelListItem from './channel-list-item'

interface ChannelsGridProps {
  playlistTitles: string[]
  selectedTitle: string
  sideBarWidth: number
}

const ChannelsGrid: React.FC<ChannelsGridProps> = ({ playlistTitles, selectedTitle, sideBarWidth }) => (
  <Grid templateRows={`repeat(${playlistTitles.length}, 1fr)`} gap={1}>
    {playlistTitles.map((title, index) => (
      <ChannelListItem
        key={`${index}-${title}`}
        selectedTitle={selectedTitle}
        title={title}
        sidebarWidth={sideBarWidth}
      />
    ))}
  </Grid>
)

export default ChannelsGrid

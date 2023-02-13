import React from 'react'
import { PlaylistItem } from 'iptv-playlist-parser'
import ContentItem from './content-item'
import contentListHelper from './content-list-helper'

interface ChannelsAndMoviesListProps {
  channelsOrMovies: PlaylistItem[]
}

const ChannelsAndMoviesList: React.FC<ChannelsAndMoviesListProps> = ({ channelsOrMovies }) => {
  return (
    <>
      {channelsOrMovies.map((playlistItem, index) => (
        <ContentItem
          key={`${playlistItem.name}-${index}`}
          onClickCallback={() => contentListHelper.handleSelectedNonSerial(playlistItem)}
          playlistItem={playlistItem}
        />
      ))}
    </>
  )
}

export default ChannelsAndMoviesList

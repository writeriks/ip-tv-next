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
      {channelsOrMovies.map((playlistItem) => (
        <ContentItem
          key={`${playlistItem.name}`}
          onClickCallback={() => contentListHelper.handleSelectedNonSerial(playlistItem)}
          playlistItem={playlistItem}
        />
      ))}
    </>
  )
}

export default ChannelsAndMoviesList

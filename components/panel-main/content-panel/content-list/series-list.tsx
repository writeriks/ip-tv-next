import React from 'react'
import { ParsedSerialTitles } from '../../../../store/reducers/channels-reducer/channels-slice'
import ContentItem from './content-item'
import contentListHelper from './content-list-helper'

interface SeriesListProps {
  serials: ParsedSerialTitles
}

const SeriesList: React.FC<SeriesListProps> = ({ serials }) => (
  <>
    {Object.values(serials).map((playlistItem) => (
      <ContentItem
        key={`${playlistItem[0].name}`}
        onClickCallback={() => contentListHelper.handleSelectedSerial(playlistItem)}
        playlistItem={playlistItem[0]}
      />
    ))}
  </>
)

export default SeriesList

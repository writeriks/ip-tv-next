import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux-store'
import { ChannelsState } from './channels-slice'

class ChannelsReducerSelector {
  getChannelsReducer = (state: RootState): ChannelsState => state.channels

  getMovies = createSelector(this.getChannelsReducer, (channels) => channels.movies)

  getLiveChannels = createSelector(this.getChannelsReducer, (channels) => channels.liveChannels)

  getParsedSeries = createSelector(this.getChannelsReducer, (channels) => channels.parsedSeries)
}

const channelsReducerSelector = new ChannelsReducerSelector()
export default channelsReducerSelector

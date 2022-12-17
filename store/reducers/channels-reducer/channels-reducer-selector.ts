import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux-store'
import { ChannelsState } from './channels-slice'

class ChannelsReducerSelector {
  getChannelsReducer = (state: RootState): ChannelsState => state.channels

  getMovies = createSelector(this.getChannelsReducer, (channels) => channels.movies)

  getLiveChannels = createSelector(this.getChannelsReducer, (channels) => channels.liveChannels)

  getSeries = createSelector(this.getChannelsReducer, (channels) => channels.series)

  getSeriesPosters = createSelector(this.getChannelsReducer, (channels) => channels.seriesPosters)
}

const channelsReducerSelector = new ChannelsReducerSelector()
export default channelsReducerSelector

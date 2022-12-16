import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux-store'
import { ChannelsState } from './channels-slice'

class ChannelsReducerSelector {
  getChannelsReducer = (state: RootState): ChannelsState => state.channels

  getChannels = createSelector(this.getChannelsReducer, (channels) => channels.allChannels)

  getMovies = createSelector(this.getChannelsReducer, (channels) => channels.movies)

  getSeries = createSelector(this.getChannelsReducer, (channels) => channels.series)

  getLiveChannels = createSelector(this.getChannelsReducer, (channels) => channels.liveChannels)
}

const channelsReducerSelector = new ChannelsReducerSelector()
export default channelsReducerSelector

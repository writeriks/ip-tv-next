import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux-store'
import { ContextState } from './context-slice'

class ContextReducerSelector {
  getContextReducer = (state: RootState): ContextState => state.context

  getIsMobile = createSelector(this.getContextReducer, (context) => context.isMobile)

  getSelectedCategory = createSelector(this.getContextReducer, (context) => context.selectedCategory)

  getLiveChannelTitles = createSelector(this.getContextReducer, (context) => context.liveChannelTitles)

  getMovieTitles = createSelector(this.getContextReducer, (context) => context.movieTitles)

  getSerialTitles = createSelector(this.getContextReducer, (context) => context.serialTitles)

  getSelectedTitle = createSelector(this.getContextReducer, (context) => context.selectedTitle)

  getSearchText = createSelector(this.getContextReducer, (context) => context.searchText)
}

const contextReducerSelector = new ContextReducerSelector()
export default contextReducerSelector

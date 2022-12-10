import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux-store'
import { ContextState } from './context-slice'

class ContextReducerSelector {
  getContextReducer = (state: RootState): ContextState => state.context

  getChannels = createSelector(this.getContextReducer, (context) => context.channels)

  getIsMobile = createSelector(this.getContextReducer, (context) => context.isMobile)

  getSelectedCategory = createSelector(this.getContextReducer, (context) => context.selectedCategory)
}

const contextReducerSelector = new ContextReducerSelector()
export default contextReducerSelector

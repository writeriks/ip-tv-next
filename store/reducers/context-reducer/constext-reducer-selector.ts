import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux-store'
import { ContextState } from './context-slice'

class ContextReducerSelector {
  getContextReducer = (state: RootState): ContextState => state.context

  getIsMobile = createSelector(this.getContextReducer, (context) => context.isMobile)

  getSelectedCategory = createSelector(this.getContextReducer, (context) => context.selectedCategory)

  getSelectedTitle = createSelector(this.getContextReducer, (context) => context.selectedTitle)

  getSearchText = createSelector(this.getContextReducer, (context) => context.searchText)
}

const contextReducerSelector = new ContextReducerSelector()
export default contextReducerSelector

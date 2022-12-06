import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux-store'
import { UIState } from './ui-slice'

class UiReducerSelector {
  getUiReducer = (state: RootState): UIState => state.ui

  getIsLoading = createSelector(this.getUiReducer, (ui) => ui.isLoading)
}

const uiReducerSelector = new UiReducerSelector()
export default uiReducerSelector

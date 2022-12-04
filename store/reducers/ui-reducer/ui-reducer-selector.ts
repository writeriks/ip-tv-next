import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux-store'

class UiReducerSelector {
  getUiReducer = (state: RootState) => state.ui

  getIsLoading = createSelector(this.getUiReducer, (ui) => ui.isLoading)
}

const uiReducerSelector = new UiReducerSelector()
export default uiReducerSelector

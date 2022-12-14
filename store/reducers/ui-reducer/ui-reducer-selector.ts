import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux-store'
import { UIState } from './ui-slice'

class UiReducerSelector {
  getUiReducer = (state: RootState): UIState => state.ui

  getIsLoading = createSelector(this.getUiReducer, (ui) => ui.isLoading)

  getIsSideBarVisible = createSelector(this.getUiReducer, (ui) => ui.isSideBarVisible)

  getIsSideBarWidth = createSelector(this.getUiReducer, (ui) => ui.sideBarWidth)

  getModal = createSelector(this.getUiReducer, (ui) => ui.modal)
}

const uiReducerSelector = new UiReducerSelector()
export default uiReducerSelector

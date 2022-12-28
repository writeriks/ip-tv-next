import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../redux-store'
import { ErrorState } from './error-slice'

class ErrorReducerSelector {
  getErrorReducer = (state: RootState): ErrorState => state.error

  getError = createSelector(this.getErrorReducer, (error) => error.error)
}

const errorReducerSelector = new ErrorReducerSelector()
export default errorReducerSelector

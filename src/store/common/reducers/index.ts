import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { GetPrefecturesResponse } from '@services/common.service'

type StateType = {
  prefectures?: GetPrefecturesResponse
}

const initialState: StateType = { prefectures: undefined }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getPrefectures.fulfilled, (state, action) => {
    state.prefectures = action.payload
  })
})

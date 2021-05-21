import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { GetPrefecturesResponse, HardwareResponse } from '@services/common.service'

type StateType = {
  prefectures?: GetPrefecturesResponse
  hardwares?: HardwareResponse
}

const initialState: StateType = { prefectures: undefined, hardwares: undefined }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getPrefectures.fulfilled, (state, action) => {
      state.prefectures = action.payload
    })
    .addCase(actions.getHardwares.fulfilled, (state, action) => {
      state.hardwares = action.payload
    })
})

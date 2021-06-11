import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { GetPrefecturesResponse, HardwareResponse } from '@services/common.service'

type StateType = {
  prefectures?: GetPrefecturesResponse
  hardwares?: HardwareResponse
  dialogs: { message: string; severity: 'success' | 'error' | 'warning' | 'info' }
}

const initialState: StateType = { prefectures: undefined, hardwares: undefined, dialogs: undefined }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getPrefectures.fulfilled, (state, action) => {
      state.prefectures = action.payload
    })
    .addCase(actions.getHardwares.fulfilled, (state, action) => {
      state.hardwares = action.payload
    })
    .addCase(actions.addToast, (state, action) => {
      state.dialogs = { message: action.payload, severity: 'success' }
    })
    .addCase(actions.removeToast, (state) => {
      state.dialogs = undefined
    })
})

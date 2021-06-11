import { createReducer } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import * as actions from '../actions'
import { GetPrefecturesResponse, HardwareResponse } from '@services/common.service'

type StateType = {
  prefectures?: GetPrefecturesResponse
  hardwares?: HardwareResponse
  toasts: { uuid: string; message: string; severity: 'success' | 'error' | 'warning' | 'info' }[]
  dialogs: { message: string; severity: 'success' | 'error' | 'warning' | 'info' }
}

const initialState: StateType = { prefectures: undefined, hardwares: undefined, toasts: [], dialogs: undefined }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getPrefectures.fulfilled, (state, action) => {
      state.prefectures = action.payload
    })
    .addCase(actions.getHardwares.fulfilled, (state, action) => {
      state.hardwares = action.payload
    })
    .addCase(actions.addToast, (state, action) => {
      state.toasts = [...state.toasts, { message: action.payload, severity: 'success', uuid: uuidv4() }]
    })
    .addCase(actions.removeToast, (state, action) => {
      state.toasts = state.toasts.filter((t) => t.uuid !== action.payload)
    })
    .addCase(actions.cleanToasts, (state) => {
      state.toasts = []
    })
    .addCase(actions.showDialog, (state, action) => {
      state.dialogs = { message: action.payload, severity: 'success' }
    })
    .addCase(actions.removeDialog, (state) => {
      state.dialogs = undefined
    })
})

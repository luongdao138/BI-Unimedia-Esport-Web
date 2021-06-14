import { createReducer } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import * as actions from '../actions'
import { Dialog } from '../actions/types'
import { GetPrefecturesResponse, HardwareResponse } from '@services/common.service'

type StateType = {
  prefectures?: GetPrefecturesResponse
  hardwares?: HardwareResponse
  toasts: { uuid: string; message: string; severity: 'success' | 'error' | 'warning' | 'info' }[]
  dialog: Dialog | undefined
  action: string | null
}

const initialState: StateType = { prefectures: undefined, hardwares: undefined, toasts: [], dialog: undefined, action: null }

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
      state.dialog = action.payload
      state.action = null
    })
    .addCase(actions.removeDialog, (state) => {
      state.dialog = undefined
    })
    .addCase(actions.actionDialog, (state, action) => {
      state.action = action.payload
    })
})

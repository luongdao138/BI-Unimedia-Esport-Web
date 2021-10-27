import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/common.service'
import { COMMON_ACTION_TYPE, Dialog, NotFoundType } from './types'

export const getPrefectures = createAsyncThunk<services.GetPrefecturesResponse, services.GetPrefecturesParams>(
  COMMON_ACTION_TYPE.GET_PREFECTURES,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getPrefectures(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getHardwares = createAsyncThunk<services.HardwareResponse>(
  COMMON_ACTION_TYPE.GET_HARDWARES,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getHardwares()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const setNotFound = createAction<{ notFound: NotFoundType | null }>(COMMON_ACTION_TYPE.SET_NOT_FOUND)

export const showDialog = createAction<Dialog>('dialog/addDialog')
export const actionDialog = createAction<string>('dialog/actionDialog')
export const removeDialog = createAction('dialog/removeDialog')

export const addToast = createAction<string>('toast/addToast')
export const removeToast = createAction<string>('toast/removeToast')
export const cleanToasts = createAction('toast/cleanToasts')

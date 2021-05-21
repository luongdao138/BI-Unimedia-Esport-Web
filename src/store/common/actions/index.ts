import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/common.service'
import { COMMON_ACTION_TYPE } from './types'

export const getPrefectures = createAsyncThunk<services.GetPrefecturesResponse>(
  COMMON_ACTION_TYPE.GET_PREFECTURES,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getPrefectures()
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

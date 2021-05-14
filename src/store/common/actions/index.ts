import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/common.service'
import { COMMON_ACTION_TYPE } from './types'

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

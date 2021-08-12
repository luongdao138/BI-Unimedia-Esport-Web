import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/liveStream.service'
import { ACTION_STREAM_TYPES } from './types'

export const getLiveSettingInfo = createAsyncThunk<services.LiveStreamSettingResponse, services.LiveStreamSettingParams>(
  ACTION_STREAM_TYPES.GET_INFORMATION_LIVE_SETTING,
  async (liveSettingParams, { rejectWithValue }) => {
    try {
      const res = await services.getLiveSetting(liveSettingParams)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/liveStream.service'
import { getTimeZone } from '@utils/helpers/CommonHelper'
import { ACTION_STREAM_TYPES } from './types'

export const getLiveSettingInfo = createAsyncThunk<services.LiveStreamSettingResponse, services.LiveStreamSettingParams>(
  ACTION_STREAM_TYPES.GET_INFORMATION_LIVE_SETTING,
  async (liveSettingParams, { rejectWithValue }) => {
    try {
      const res = await services.getLiveSetting({ ...liveSettingParams, timezone: getTimeZone() })
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getScheduleSettingInfo = createAsyncThunk<services.LiveStreamSettingResponse, services.LiveStreamSettingParams>(
  ACTION_STREAM_TYPES.GET_INFORMATION_SCHEDULE,
  async (liveSettingParams, { rejectWithValue }) => {
    try {
      const res = await services.getScheduleSetting({ ...liveSettingParams, timezone: getTimeZone() })
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const setLiveStream = createAsyncThunk<services.SetLiveStreamResponse, services.SetLiveStreamParams>(
  ACTION_STREAM_TYPES.SET_INFORMATION_LIVE_SETTING,
  async (setLiveStreamParams, { rejectWithValue }) => {
    try {
      const res = await services.setLiveSetting({ ...setLiveStreamParams, timezone: getTimeZone() })
      if (res?.code === 200) {
        return res
      } else {
        // throw res.message
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getStreamUrlAndKeyInfo = createAsyncThunk<services.GetStreamUrlAndKeyResponse, services.StreamUrlAndKeyParams>(
  ACTION_STREAM_TYPES.GET_STREAM_URL_AND_KEY,
  async (secretKeyParams, { rejectWithValue }) => {
    try {
      const res = await services.getStreamUrlAndKey(secretKeyParams)
      if (res?.code === 200) {
        // console.log("====getStreamUrlAndKey====",res)
        return res
      } else {
        // throw res.message
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCategory = createAsyncThunk<services.GetCategoryResponse>(
  ACTION_STREAM_TYPES.GET_CATEGORY,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getCategory()
      if (res?.code === 200) {
        return res
      } else {
        // throw res.message
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getChannel = createAsyncThunk<services.GetChannelResponse>(ACTION_STREAM_TYPES.GET_CHANNEL, async (_, { rejectWithValue }) => {
  try {
    const res = await services.getChannel()
    if (res?.code === 200) {
      return res
    } else {
      // throw res.message
      return rejectWithValue(JSON.stringify(res.message))
    }
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const setChannel = createAsyncThunk<services.SetChannelResponse, services.SetChannelParams>(
  ACTION_STREAM_TYPES.SET_CHANNEL,
  async (setChannelParams, { rejectWithValue }) => {
    try {
      const res = await services.setChannel(setChannelParams)
      if (res?.code === 200) {
        return res
      } else {
        // throw res.message
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

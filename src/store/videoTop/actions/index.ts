import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/videoTop.services'
import { ACTION_VIDEO_TOP } from './types'

export const getListVideoAll = createAsyncThunk<services.ListVideoTopResponse, services.ListVideoTopParams>(
  ACTION_VIDEO_TOP.GET_LIST_ALL,
  async (videoParams, { rejectWithValue }) => {
    try {
      const res = await services.ListVideoAll(videoParams)
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

export const getCategoryPopularVideo = createAsyncThunk<services.VideoPopularResponse>(
  ACTION_VIDEO_TOP.GET_VIDEO_POPULAR,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.ListVideoPopular()
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

export const getBannerTop = createAsyncThunk<services.BannerResponse>(ACTION_VIDEO_TOP.GET_BANNER, async (_, { rejectWithValue }) => {
  try {
    const res = await services.GetBanner()
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

export const getVideoLive = createAsyncThunk<services.VideoTypeLiveResponse, services.ListVideoTopParams>(
  ACTION_VIDEO_TOP.GET_LIST_LIVE,
  async (videoParams, { rejectWithValue }) => {
    try {
      const res = await services.ListVideoLiveStream(videoParams)
      if (res?.code === 200) {
        // console.log('=====res LIVE====', res)
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

export const getVideoSchedule = createAsyncThunk<services.VideoTypeScheduleResponse, services.ListVideoTopParams>(
  ACTION_VIDEO_TOP.GET_LIST_SCHEDULE,
  async (videoParams, { rejectWithValue }) => {
    try {
      const res = await services.ListVideoSchedule(videoParams)
      if (res?.code === 200) {
        // console.log('=====res GET_LIST_SCHEDULE====', res)
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

export const getVideoArchived = createAsyncThunk<services.VideoTypeArchivedResponse, services.ListVideoTopParams>(
  ACTION_VIDEO_TOP.GET_LIST_ARCHIVE,
  async (videoParams, { rejectWithValue }) => {
    try {
      const res = await services.ListVideoArchived(videoParams)
      if (res?.code === 200) {
        // console.log('=====res GET_LIST_ARCHIVE====', res)
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

export const getListVideoFavorite = createAsyncThunk<services.ListVideoTopResponse>(
  ACTION_VIDEO_TOP.GET_LIST_FAVORITE,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.ListVideoFavorite()
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

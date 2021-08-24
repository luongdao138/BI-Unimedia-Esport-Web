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

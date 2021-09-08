import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
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

export const videoSearch = createAsyncThunk<services.SearchVideoResponse, services.SearchVideoParams>(
  ACTION_VIDEO_TOP.SEARCH_VIDEO,
  async (searchParams, { rejectWithValue }) => {
    try {
      const res = await services.VideoSearch(searchParams)
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

export const resetSearchVideo = createAction(ACTION_VIDEO_TOP.RESET_SEARCH_VIDEO)
export const resetLive = createAction(ACTION_VIDEO_TOP.RESET_LIVE)
export const resetSchedule = createAction(ACTION_VIDEO_TOP.RESET_SCHEDULE)
export const resetArchive = createAction(ACTION_VIDEO_TOP.RESET_ARCHIVE)

export const videoDetail = createAsyncThunk<services.VideoDetailResponse, services.VideoDetailParams>(
  ACTION_VIDEO_TOP.VIDEO_DETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.DetailVideo(params)
      // console.log("=====DETAIL====",res)
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

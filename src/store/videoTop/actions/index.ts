import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/videoTop.services'
import { getTimeZone } from '@utils/helpers/CommonHelper'
import { ACTION_VIDEO_TOP } from './types'

export const getListVideoAll = createAsyncThunk<services.ListVideoTopResponse, services.ListVideoTopParams>(
  ACTION_VIDEO_TOP.GET_LIST_ALL,
  async (videoParams, { rejectWithValue }) => {
    try {
      const res = await services.ListVideoAll({ ...videoParams, timezone: getTimeZone() })
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

export const getCategoryPopularVideo = createAsyncThunk<services.VideoPopularResponse, services.CategoryPopularParams>(
  ACTION_VIDEO_TOP.GET_VIDEO_POPULAR,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.ListVideoPopular(params)
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
      const res = await services.ListVideoLiveStream({ ...videoParams, timezone: getTimeZone() })
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
      const res = await services.ListVideoSchedule({ ...videoParams, timezone: getTimeZone() })
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
      const res = await services.ListVideoArchived({ ...videoParams, timezone: getTimeZone() })
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

export const getListVideoFavorite = createAsyncThunk<services.ListVideoTopResponse, services.ListVideoTopParams>(
  ACTION_VIDEO_TOP.GET_LIST_FAVORITE,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.ListVideoFavorite(params)
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
      const res = await services.VideoSearch({ ...searchParams, timezone: getTimeZone() })
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
export const changeStreamingSecond = createAction<services.StreamingChangeParams>(ACTION_VIDEO_TOP.CHANGE_STREAMING_SECOND)
export const changeVideoTime = createAction<services.VideoTimeChangeParams>(ACTION_VIDEO_TOP.CHANGE_VIDEO_TIME)
export const changePlayedSecond = createAction<services.PlayedSecondChangeParams>(ACTION_VIDEO_TOP.CHANGE_PLAYED_SECOND)
export const changeIsViewingStream = createAction<services.ChangeIsViewingStreamParams>(ACTION_VIDEO_TOP.CHANGE_IS_VIEWING_STREAM)
export const changeIsEndLive = createAction<{ is_end_live: boolean }>(ACTION_VIDEO_TOP.CHANGE_IS_END_LIVE)
export const changeSeekCount = createAction<{ seeked_second: number }>(ACTION_VIDEO_TOP.CHANGE_SEEK_COUNT)
export const resetVideoDetailError = createAction(ACTION_VIDEO_TOP.RESET_VIDEO_DETAIL_ERROR)
export const changeIsPausingLive = createAction<{ is_pausing_live: boolean }>(ACTION_VIDEO_TOP.CHANGE_IS_PAUSING_LIVE)

export const videoDetail = createAsyncThunk<services.VideoDetailResponse, services.VideoDetailParams>(
  ACTION_VIDEO_TOP.VIDEO_DETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.DetailVideo({ ...params, timezone: getTimeZone() })
      if (res?.code === 200) {
        return res
      } else {
        // throw res.message
        return rejectWithValue(res.message)
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
// import * as services from '@services/liveStream.service'
import * as services from '@services/archiveList.service'
import { ACTION_ARCHIVE_VIDEO_TYPES } from './types'
import { getTimeZone } from '@utils/helpers/CommonHelper'

export const getArchiveList = createAsyncThunk<services.ArchiveListResponse, services.ArchiveListRequestParams>(
  ACTION_ARCHIVE_VIDEO_TYPES.GET_ARCHIVE_VIDEO_LIST,
  async ({ ...params }, { rejectWithValue }) => {
    try {
      return await services.getLiveSetting({ ...params, timezone: getTimeZone() })
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getArchiveDetail = createAsyncThunk<services.ArchiveDetailResponse, services.ArchiveDetailRequestParams>(
  ACTION_ARCHIVE_VIDEO_TYPES.GET_ARCHIVE_VIDEO_DETAIL,
  async ({ ...params }, { rejectWithValue }) => {
    try {
      return await services.getArchiveDetail({ ...params, timezone: getTimeZone() })
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateArchiveVideoDetail = createAsyncThunk<services.ArchiveDetailResponse, services.UpdateArchiveDetailRequestParams>(
  ACTION_ARCHIVE_VIDEO_TYPES.UPDATE_ARCHIVE_VIDEO_DETAIL,
  async ({ ...params }, { rejectWithValue }) => {
    try {
      return await services.updateArchiveDetail({ ...params, timezone: getTimeZone() })
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
// export const getLiveSettingInfo = createAsyncThunk<services.LiveStreamSettingResponse, services.LiveStreamSettingParams>(
//   ACTION_STREAM_TYPES.GET_INFORMATION_LIVE_SETTING,
//   async (liveSettingParams, { rejectWithValue }) => {
//     try {
//       const res = await services.getLiveSetting({ ...liveSettingParams, timezone: getTimeZone() })
//       return res
//     } catch (error) {
//       if (!error.response) {
//         throw error
//       }
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
//
// export const getScheduleSettingInfo = createAsyncThunk<services.LiveStreamSettingResponse, services.LiveStreamSettingParams>(
//   ACTION_STREAM_TYPES.GET_INFORMATION_SCHEDULE,
//   async (liveSettingParams, { rejectWithValue }) => {
//     try {
//       const res = await services.getScheduleSetting({ ...liveSettingParams, timezone: getTimeZone() })
//       return res
//     } catch (error) {
//       if (!error.response) {
//         throw error
//       }
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
//
// export const setLiveStream = createAsyncThunk<services.SetLiveStreamResponse, services.SetLiveStreamParams>(
//   ACTION_STREAM_TYPES.SET_INFORMATION_LIVE_SETTING,
//   async (setLiveStreamParams, { rejectWithValue }) => {
//     try {
//       const res = await services.setLiveSetting({ ...setLiveStreamParams, timezone: getTimeZone() })
//       if (res?.code === 200) {
//         return res
//       } else {
//         // throw res.message
//         return rejectWithValue(JSON.stringify(res.message))
//       }
//     } catch (error) {
//       if (!error.response) {
//         throw error
//       }
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
//
// export const getStreamUrlAndKeyInfo = createAsyncThunk<services.GetStreamUrlAndKeyResponse, services.StreamUrlAndKeyParams>(
//   ACTION_STREAM_TYPES.GET_STREAM_URL_AND_KEY,
//   async (secretKeyParams, { rejectWithValue }) => {
//     try {
//       const res = await services.getStreamUrlAndKey({ ...secretKeyParams, is_medialive: true })
//       if (res?.code === 200) {
//         // console.log("====getStreamUrlAndKey====",res)
//         return res
//       } else {
//         // throw res.message
//         return rejectWithValue(res)
//       }
//     } catch (error) {
//       if (!error.response) {
//         throw error
//       }
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
//
// export const getCategory = createAsyncThunk<services.GetCategoryResponse>(
//   ACTION_STREAM_TYPES.GET_CATEGORY,
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await services.getCategory()
//       if (res?.code === 200) {
//         return res
//       } else {
//         // throw res.message
//         return rejectWithValue(JSON.stringify(res.message))
//       }
//     } catch (error) {
//       if (!error.response) {
//         throw error
//       }
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
//
// export const getChannel = createAsyncThunk<services.GetChannelResponse>(ACTION_STREAM_TYPES.GET_CHANNEL, async (_, { rejectWithValue }) => {
//   try {
//     const res = await services.getChannel()
//     if (res?.code === 200) {
//       return res
//     } else {
//       // throw res.message
//       return rejectWithValue(JSON.stringify(res.message))
//     }
//   } catch (error) {
//     if (!error.response) {
//       throw error
//     }
//     return rejectWithValue(error.response.data)
//   }
// })
//
// export const setChannel = createAsyncThunk<services.SetChannelResponse, services.SetChannelParams>(
//   ACTION_STREAM_TYPES.SET_CHANNEL,
//   async (setChannelParams, { rejectWithValue }) => {
//     try {
//       const res = await services.setChannel(setChannelParams)
//       if (res?.code === 200) {
//         return res
//       } else {
//         // throw res.message
//         return rejectWithValue(JSON.stringify(res.message))
//       }
//     } catch (error) {
//       if (!error.response) {
//         throw error
//       }
//       return rejectWithValue(error.response.data)
//     }
//   }
// )

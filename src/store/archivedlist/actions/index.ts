import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
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

export const overrideArchiveVideo = createAction<{
  uuid: string
  thumbnail?: string
  title?: string
  publish_flag?: number
  description?: string
}>(ACTION_ARCHIVE_VIDEO_TYPES.OVERRIDE_ARCHIVE_VIDEO_DETAIL)

export const deleteArchiveVideo = createAsyncThunk<services.ArchiveDetailResponse, services.DeleteArchiveVideoRequestParams>(
  ACTION_ARCHIVE_VIDEO_TYPES.DELETE_ARCHIVE_VIDEO,
  async ({ ...params }, { rejectWithValue }) => {
    try {
      return await services.deleteArchiveVideo({ ...params })
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const overrideDeleteVideo = createAction<{ uuid: string }>(ACTION_ARCHIVE_VIDEO_TYPES.OVERRIDE_DELETE_VIDEO)

export const getCookieDownloadVideo = createAsyncThunk<services.GetCookieResponse, services.GetCookieRequestParams>(
  ACTION_ARCHIVE_VIDEO_TYPES.GET_COOKIE_DOWNLOAD,
  async ({ ...params }, { rejectWithValue }) => {
    try {
      return await services.getCookieToDownload({ ...params })
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

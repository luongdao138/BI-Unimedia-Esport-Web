import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/liveStreamDetail.service'
import { getTimeZone } from '@utils/helpers/CommonHelper'
import { ACTION_VIDEO_DETAIL_STREAM } from './types'

export const resetArchivedVideoStream = createAction(ACTION_VIDEO_DETAIL_STREAM.RESET_ARCHIVED_STREAM)
export const resetRelatedVideoStream = createAction(ACTION_VIDEO_DETAIL_STREAM.RESET_RELATED_STREAM)

export const getListArchivedVideoStream = createAsyncThunk<
  services.ListArchivedVideoStreamResponse,
  services.ListArchivedVideoStreamParams
>(ACTION_VIDEO_DETAIL_STREAM.GET_LIST_ARCHIVE_VIDEOS_STREAM, async (archivedParams, { rejectWithValue }) => {
  try {
    const res = await services.ListArchivedVideoStream({ ...archivedParams, timezone: getTimeZone() })
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

export const getListRelatedVideoStream = createAsyncThunk<services.ListArchivedVideoStreamResponse, services.ListArchivedVideoStreamParams>(
  ACTION_VIDEO_DETAIL_STREAM.GET_LIST_RELATED_VIDEOS_STREAM,
  async (relatedParams, { rejectWithValue }) => {
    try {
      const res = await services.ListRelatedVideoStream({ ...relatedParams, timezone: getTimeZone() })
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

export const reactionVideoStream = createAsyncThunk<services.ReactionUserResponse, services.ReactionUserParams>(
  ACTION_VIDEO_DETAIL_STREAM.REACTION_VIDEO_STREAM,
  async (reactionParams, { rejectWithValue }) => {
    try {
      const res = await services.ReactionUserVideoStream(reactionParams)
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

export const followChannelAction = createAsyncThunk<services.FollowChannelResponse, services.FollowChannelParams>(
  ACTION_VIDEO_DETAIL_STREAM.FOLLOW_CHANNEL_ACTION,
  async (followParams, { rejectWithValue }) => {
    try {
      const res = await services.FollowChannelService(followParams)
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

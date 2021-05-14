import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/following.service'
import { FOLLOWING_ACTION_TYPE } from './types'

export const following = createAsyncThunk<services.FollowingResponse, services.FollowingParams>(
  FOLLOWING_ACTION_TYPE.FOLLOWING,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.following(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearFollowing = createAction(FOLLOWING_ACTION_TYPE.CLEAR_FOLLOWING)

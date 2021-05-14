import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/follow.service'
import { FOLLOWERS_ACTION_TYPE } from './types'

export const followers = createAsyncThunk<services.FollowersResponse, services.FollowersParams>(
  FOLLOWERS_ACTION_TYPE.FOLLOWERS,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.followers(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearFollowers = createAction(FOLLOWERS_ACTION_TYPE.CLEAR_FOLLOWERS)

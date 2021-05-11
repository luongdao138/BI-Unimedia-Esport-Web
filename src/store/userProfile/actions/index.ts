import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/user.service'
import { USER_PROFILE_ACTION_TYPE } from './types'

export const getUserProfile = createAsyncThunk(
  USER_PROFILE_ACTION_TYPE.USER_PROFILE_SET_USER_DETAIL,
  async (_u: undefined, { rejectWithValue }) => {
    try {
      const res = await services.getUserProfile()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
    return null
  }
)

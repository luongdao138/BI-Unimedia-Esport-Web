import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/home.service'
import { HOME_ACTION_TYPE } from './types'

export const recommendedUsers = createAsyncThunk<services.RecommendedUsersResponse>(
  HOME_ACTION_TYPE.RECOMMENDED_USERS,
  async (_params, { rejectWithValue }) => {
    try {
      const res = await services.getRecommendedUsers()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

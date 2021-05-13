import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/recruitment.service'
import { RECRUITMENT_ACTION_TYPE } from './types'

export const getRecommendations = createAsyncThunk<services.RecommendationsResponse>(
  RECRUITMENT_ACTION_TYPE.RECOMMENDATIONS,
  async (_params, { rejectWithValue }) => {
    try {
      const res = await services.getRecommendations()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

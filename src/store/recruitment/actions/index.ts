import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/recruitment.service'
import { RECRUITMENT_ACTION_TYPE } from './types'

export const getRecommendations = createAsyncThunk<services.RecommendationsResponse, services.RecommendationsParams>(
  RECRUITMENT_ACTION_TYPE.RECOMMENDATIONS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getRecommendations(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getRecruitmentFollowers = createAsyncThunk<services.RecruitmentFollowersResponse, services.RecruitmentFollowersParams>(
  RECRUITMENT_ACTION_TYPE.RECRUITMENT_FOLLOWERS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getRecruitmentFollowers(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/community.service'
import { COMMUNITY_ACTION_TYPE } from './types'

export const getCommunityList = createAsyncThunk<services.CommunityListResponse, services.CommunitySearchParams>(
  COMMUNITY_ACTION_TYPE.GET_COMMUNITY_LIST,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.communityList(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTopicFollowers = createAsyncThunk<services.TopicFollowersResponse, services.TopicFollowersParams>(
  COMMUNITY_ACTION_TYPE.GET_FOLLOWERS_TOPIC_LIST,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getTopicFollowers(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearCommunityData = createAction(COMMUNITY_ACTION_TYPE.CLEAR_COMMUNITY_LIST)

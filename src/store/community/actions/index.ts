import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/community.service'
import { COMMUNITY_ACTION_TYPE } from './types'

export const getCommunityList = createAsyncThunk<services.CommunityListResponse>(
  COMMUNITY_ACTION_TYPE.GET_COMMUNITY_LIST,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.communityList()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getFollowersTopic = createAsyncThunk<services.CommunityFollowersTopicResponse>(
  COMMUNITY_ACTION_TYPE.GET_FOLLOWERS_TOPIC_LIST,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.followersTopic()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

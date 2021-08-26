import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/community.service'
import { COMMUNITY_ACTION_TYPE } from './types'

export const getTopicList = createAsyncThunk<services.TopicListResponse, services.TopicListParams>(
  COMMUNITY_ACTION_TYPE.GET_TOPIC_LIST,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getTopicList(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

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

export const getCommunityListPublic = createAsyncThunk<services.CommunityListResponse, services.CommunitySearchParams>(
  COMMUNITY_ACTION_TYPE.GET_COMMUNITY_LIST,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.communityListPublic(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCommunityListByUser = createAsyncThunk<services.CommunityListResponse, services.CommunityListByUserParams>(
  COMMUNITY_ACTION_TYPE.GET_COMMUNITY_LIST_BY_USER,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.communityListByUser(param)
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
export const clearCommunityDataByUser = createAction(COMMUNITY_ACTION_TYPE.CLEAR_COMMUNITY_LIST_BY_USER)

export const getCommunityDetail = createAsyncThunk<services.CommunityDetailResponse, string>(
  COMMUNITY_ACTION_TYPE.GET_COMMUNITY_DETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getCommunityDetail(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const createCommunity = createAsyncThunk<services.CreateCommunityResponse, services.CommunityFormParams>(
  COMMUNITY_ACTION_TYPE.CREATE_COMMUNITY,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.createCommunity(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateCommunity = createAsyncThunk<services.UpdateCommunityResponse, services.UpdateParams>(
  COMMUNITY_ACTION_TYPE.UPDATE_COMMUNITY,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.updateCommunity(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCommunityFeatures = createAsyncThunk<services.CommunityFeaturesResponse>(
  COMMUNITY_ACTION_TYPE.GET_COMMUNITY_FEATURES,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getCommunityFeatures()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const createTopic = createAsyncThunk<services.CreateTopicResponse, services.TopicParams>(
  COMMUNITY_ACTION_TYPE.CREATE_TOPIC,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.createTopic(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTopicDetail = createAsyncThunk<services.TopicDetailResponse, services.TopicDetailParams>(
  COMMUNITY_ACTION_TYPE.GET_TOPIC_DETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getTopicDetail(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearTopicDetail = createAction(COMMUNITY_ACTION_TYPE.CLEAR_TOPIC_DETAIL)

export const deleteTopic = createAsyncThunk<void, services.TopicDetailParams>(
  COMMUNITY_ACTION_TYPE.DELETE_TOPIC,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.deleteTopic(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const followCommunity = createAsyncThunk<services.CommunityFollowResponse, string>(
  COMMUNITY_ACTION_TYPE.FOLLOW_COMMUNITY,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.followCommunity(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const unfollowCommunity = createAsyncThunk<void, string>(
  COMMUNITY_ACTION_TYPE.UNFOLLOW_COMMUNITY,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.unfollowCommunity(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

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

export const getCommunityList = createAsyncThunk<services.CommunityListResponse, services.CommunityListParams>(
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

export const communitySearch = createAsyncThunk<services.CommunitySearchResponse, services.CommunitySearchParams>(
  COMMUNITY_ACTION_TYPE.SEARCH_COMMUNITY,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.communitySearch(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getCommunityListPublic = createAsyncThunk<services.CommunityListResponse, services.CommunityListParams>(
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

export const resetTopicFollowers = createAction(COMMUNITY_ACTION_TYPE.RESET_FOLLOWERS_TOPIC_LIST)

export const clearCommunityData = createAction(COMMUNITY_ACTION_TYPE.CLEAR_COMMUNITY_LIST)
export const clearCommunityDataByUser = createAction(COMMUNITY_ACTION_TYPE.CLEAR_COMMUNITY_LIST_BY_USER)
export const clearTopicListData = createAction(COMMUNITY_ACTION_TYPE.CLEAR_TOPIC_LIST)
export const clearCommunityDetail = createAction(COMMUNITY_ACTION_TYPE.CLEAR_COMMUNITY_DETAIL)
export const clearSearchTopic = createAction(COMMUNITY_ACTION_TYPE.CLEAR_SEARCH_TOPIC)

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

export const checkCommunityName = createAsyncThunk<services.CheckCommunityNameResponse, services.CheckCommunityNameParams>(
  COMMUNITY_ACTION_TYPE.CHECK_COMMUNITY_NAME,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.checkCommunityName(params)
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

export const resetCommunityMembers = createAction(COMMUNITY_ACTION_TYPE.RESET_COMMUNITY_MEMBERS)

export const getCommunityMembers = createAsyncThunk<services.CommunityMembersResponse, services.CommunityMembersParams>(
  COMMUNITY_ACTION_TYPE.GET_COMMUNITY_MEMBERS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getCommunityMembers(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const changeCommunityMemberRole = createAsyncThunk<void, services.ChangeCommunityMemberRoleParams>(
  COMMUNITY_ACTION_TYPE.CHANGE_COMMUNITY_MEMBER_ROLE,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.changeCommunityMemberRole(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const closeCommunity = createAsyncThunk<void, string>(COMMUNITY_ACTION_TYPE.CLOSE_COMMUNITY, async (params, { rejectWithValue }) => {
  try {
    const res = await services.closeCommunity(params)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const createTopic = createAsyncThunk<services.TopicDetailResponse, services.TopicParams>(
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

export const deleteTopic = createAsyncThunk<void, services.TopicDeleteParams>(
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

export const getTopicComment = createAsyncThunk<services.CommentDetailResponse, services.CommentDetailParams>(
  COMMUNITY_ACTION_TYPE.GET_TOPIC_COMMENT,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getTopicComment(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const resetCommentDetail = createAction(COMMUNITY_ACTION_TYPE.RESET_COMMENT_DETAIL)

export const createTopicComment = createAsyncThunk<void, services.CommentCreateParams>(
  COMMUNITY_ACTION_TYPE.CREATE_TOPIC_COMMENT,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.createTopicComment(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteTopicComment = createAsyncThunk<void, services.DeleteCommentParams>(
  COMMUNITY_ACTION_TYPE.DELETE_TOPIC_COMMENT,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.deleteTopicComment(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const searchTopic = createAsyncThunk<services.TopicSearchResponse, services.TopicSearchParams>(
  COMMUNITY_ACTION_TYPE.SEARCH_TOPIC,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.searchTopic(params)
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

export const unfollowCommunityPending = createAsyncThunk<void, string>(
  COMMUNITY_ACTION_TYPE.UNFOLLOW_COMMUNITY_PENDING,
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

export const getCommentsList = createAsyncThunk<services.CommentsListResponse, services.CommentsListParams>(
  COMMUNITY_ACTION_TYPE.GET_COMMENTS_LIST,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getCommentsList(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const resetCommentsList = createAction(COMMUNITY_ACTION_TYPE.RESET_COMMENTS_LIST)

export const resetSearchCommunity = createAction(COMMUNITY_ACTION_TYPE.RESET_SEARCH_COMMUNITY)

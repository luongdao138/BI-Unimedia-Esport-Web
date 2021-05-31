import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/user.service'
import { USER_PROFILE_ACTION_TYPE } from './types'

export const getUserProfile = createAsyncThunk(USER_PROFILE_ACTION_TYPE.GET_USER_PROFILE, async (_u: undefined, { rejectWithValue }) => {
  try {
    const res = await services.getUserProfile()
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})
export const getMemberProfile = createAsyncThunk(
  USER_PROFILE_ACTION_TYPE.GET_MEMBER_PROFILE,
  async (param: string | null, { rejectWithValue }) => {
    if (param === null) return null
    try {
      const res = await services.getUserProfile(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const profileUpdate = createAsyncThunk<services.ProfileResponse, services.ProfileUpdateParams>(
  USER_PROFILE_ACTION_TYPE.PROFILE_UPDATE,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.profileUpdate(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const profileImage = createAsyncThunk<services.ProfileImageParams, services.ProfileImageParams>(
  USER_PROFILE_ACTION_TYPE.PROFILE_IMAGE,
  async (param, { rejectWithValue }) => {
    try {
      await services.profileImage(param)
      return param
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const follow = createAsyncThunk<services.FollowResponse, services.FollowParams>(
  USER_PROFILE_ACTION_TYPE.FOLLOW,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.follow(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const unfollow = createAsyncThunk<services.UnFollowResponse, services.FollowParams>(
  USER_PROFILE_ACTION_TYPE.UNFOLLOW,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.unfollow(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const tournamentHistorySearch = createAsyncThunk<services.HistorySearchResponse, services.HistorySearchParams>(
  USER_PROFILE_ACTION_TYPE.TOURNAMENT_HISTORY,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.tournamentHistorySearch(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getActivityLogs = createAsyncThunk<services.ActivityLogResponse, services.ActivityLogParams>(
  USER_PROFILE_ACTION_TYPE.PROFILE_ACTIVITY_LOG,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getActivityLog(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getNicknames = createAsyncThunk(USER_PROFILE_ACTION_TYPE.PROFILE_NICKNAMES, async (_, { rejectWithValue }) => {
  try {
    const res = await services.getNicknames()
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const profileEdit = createAsyncThunk<services.ProfileResponse, services.ProfileEditParams>(
  USER_PROFILE_ACTION_TYPE.PROFILE_EDIT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.profileEdit(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const gameEdit = createAsyncThunk<services.ProfileResponse, services.GameEditParams>(
  USER_PROFILE_ACTION_TYPE.GAME_EDIT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.gameEdit(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getRecommendations = createAsyncThunk<services.RecommendationsResponse>(
  USER_PROFILE_ACTION_TYPE.RECOMMENDATIONS,
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

export const getRecommendedEvent = createAsyncThunk<services.RecommendedEventResponse, services.RecommendedEventParams>(
  USER_PROFILE_ACTION_TYPE.RECOMMENDED_EVENT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getRecommendedEvent(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateHomeSettings = createAsyncThunk<services.HomeSettingsResponse, services.HomeSettingsParams>(
  USER_PROFILE_ACTION_TYPE.UPDATE_HOME_SETTINGS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.updateHomeSettings(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const changePassword = createAsyncThunk<services.ChangePasswordResponse, services.ChangePasswordParams>(
  USER_PROFILE_ACTION_TYPE.CHANGE_PASSWORD,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.changePassword(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const changeEmailCheck = createAsyncThunk<services.ChangeEmailCheckResponse, services.ChangeEmailCheckParams>(
  USER_PROFILE_ACTION_TYPE.CHANGE_EMAIL_CHECK,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.changeEmailCheck(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const changeEmail = createAsyncThunk<services.ChangeEmailResponse, services.ChangeEmailParams>(
  USER_PROFILE_ACTION_TYPE.CHANGE_EMAIL,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.changeEmail(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const changeEmailConfirm = createAsyncThunk<services.ChangeEmailConfirmResponse, services.ChangeEmailConfirmParams>(
  USER_PROFILE_ACTION_TYPE.CHANGE_EMAIL_CONFIRM,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.changeEmailConfirm(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearChangeEmailSteps = createAction<services.ChangeEmailSteps>(USER_PROFILE_ACTION_TYPE.CLEAR_CHANGE_EMAIL_STEPS)

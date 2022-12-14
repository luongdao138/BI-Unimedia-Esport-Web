import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/settings.service'

import { SETTINGS_ACTION_TYPE } from './types'

export const getUserSettings = createAsyncThunk<services.UserSettingsResponse>(
  SETTINGS_ACTION_TYPE.GET_USER_SETTINGS,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getSettings()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getFeatures = createAsyncThunk<services.UserFeaturesResponse>(
  SETTINGS_ACTION_TYPE.GET_USER_FEATURES,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getFeatures()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getSecuritySettings = createAsyncThunk<services.MyPageSettingsResponse>(
  SETTINGS_ACTION_TYPE.GET_USER_SECURITY_SETTINGS,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getSecuritySettings()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateSecuritySettings = createAsyncThunk<services.MyPageSettingsResponse, services.MyPageSettingsParam>(
  SETTINGS_ACTION_TYPE.UPDATE_USER_SECURITY_SETTINGS,
  async (securitySettingsParam, { rejectWithValue }) => {
    try {
      const res = await services.updateSecuritySettings(securitySettingsParam)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getMessageSettings = createAsyncThunk<services.MessageSettingsResponse>(
  SETTINGS_ACTION_TYPE.GET_MESSAGE_SETTINGS,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getMessageSettings()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateMessageSettings = createAsyncThunk<services.MessageSettingsResponse, services.MessageSettingsParam>(
  SETTINGS_ACTION_TYPE.UPDATE_MESSAGE_SETTINGS,
  async (securitySettingsParam, { rejectWithValue }) => {
    try {
      const res = await services.updateMessageSettings(securitySettingsParam)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getBlockedUsers = createAsyncThunk<services.BlockedUsersResponse, services.BlockedUsersParams>(
  SETTINGS_ACTION_TYPE.GET_BLOCKED_USERS,
  async (blockParams, { rejectWithValue }) => {
    try {
      const res = await services.getBlockedUsers(blockParams)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getNotificationSettings = createAsyncThunk<services.NotificationSettingsResponse>(
  SETTINGS_ACTION_TYPE.GET_NOTIFICATION_SETTINGS,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getNotificationSettings()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateNotificationSettings = createAsyncThunk<services.NotificationSettingsResponse, services.NotificationSettingsParam>(
  SETTINGS_ACTION_TYPE.UPDATE_NOTIFICATION_SETTINGS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.updateNotificationSettings(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearNotificationSettings = createAction(SETTINGS_ACTION_TYPE.CLEAR_NOTIFICATION_SETTINGS)

export const clearBlockedUsers = createAction(SETTINGS_ACTION_TYPE.CLEAR_BLOCKED_USERS)

export const createInquiry = createAsyncThunk<services.InquiryResponse, services.InquiryParams>(
  SETTINGS_ACTION_TYPE.CREATE_INQUIRY,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.createInquiry(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getPurchaseHistory = createAsyncThunk<services.PurchaseHistoryResponse, services.PurchaseHistoryParams>(
  SETTINGS_ACTION_TYPE.GET_PURCHASE_HISTORY,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getPurchaseHistory(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearPurchaseHistory = createAction(SETTINGS_ACTION_TYPE.CLEAR_PURCHASE_HISTORY)

export const getPurchaseHistoryDetail = createAsyncThunk<services.PurchaseHistoryDetailResponse, string>(
  SETTINGS_ACTION_TYPE.GET_PURCHASE_HISTORY_DETAIL,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getPurchaseHistoryDetail(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const cancelPurchase = createAsyncThunk<services.PurchaseHistoryDetailResponse, string>(
  SETTINGS_ACTION_TYPE.CANCEL_PURCHASE,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.cancelPurchase(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearPurchaseHistoryDetail = createAction(SETTINGS_ACTION_TYPE.CLEAR_PURCHASE_HISTORY_DETAIL)

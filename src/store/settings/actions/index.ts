import { createAsyncThunk } from '@reduxjs/toolkit'
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

export const getSecuritySettings = createAsyncThunk<services.GetSecuritySettingsResponse>(
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

export const updateSecuritySettings = createAsyncThunk<services.SecuritySettingsResponse, services.SecuritySettingsParam>(
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

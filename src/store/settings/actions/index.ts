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

export const getAllGameTitles = createAsyncThunk<services.GameTitlesResponse>(
  SETTINGS_ACTION_TYPE.GET_GAME_TITLES_ALL,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getAllGameTitles()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
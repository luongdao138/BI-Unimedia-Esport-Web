import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/profile.service'
import { PROFILE_ACTION_TYPE } from './types'

export const profileUpdate = createAsyncThunk<services.ProfileUpdateResponse, services.ProfileUpdateParams>(
  PROFILE_ACTION_TYPE.PROFILE_UPDATE,
  async (param, { rejectWithValue }) => {
    console.log('profileUpdate', param)

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

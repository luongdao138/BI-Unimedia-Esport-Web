import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/auth.service'
import { AUTH_ACTION_TYPE } from './types'

export const loginByEmail = createAsyncThunk<
  services.UserLoginResponse,
  services.UserLoginParams
>(AUTH_ACTION_TYPE.LOGIN_BY_EMAIL, async (loginParam, { rejectWithValue }) => {
  try {
    const res = await services.login(loginParam)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

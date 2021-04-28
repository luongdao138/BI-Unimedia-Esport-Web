import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/auth.service'
import { AUTH_ACTION_TYPE } from './types'

export const loginByEmail = createAsyncThunk<
  services.UserLoginResponse,
  services.UserLoginRequest
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

export const registerByEmail = createAsyncThunk<
  services.UserLoginResponse,
  services.UserLoginRequest
>(
  AUTH_ACTION_TYPE.REGISTER_BY_EMAIL,
  async (registerParam, { rejectWithValue }) => {
    try {
      const res = await services.register(registerParam)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const forgotPassword = createAsyncThunk<
  services.ForgotPasswordResponse,
  services.ForgotPasswordRequest
>(
  AUTH_ACTION_TYPE.FORGOT_PASSWORD,
  async (forgotParam, { rejectWithValue }) => {
    try {
      const res = await services.forgotPassword(forgotParam)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const forgotConfirm = createAsyncThunk<
  services.UserConfirmResponse,
  services.UserConfirmRequest
>(AUTH_ACTION_TYPE.FORGOT_CONFIRM, async (forgotParam, { rejectWithValue }) => {
  try {
    const res = await services.forgotConfirm(forgotParam)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const resetPassword = createAsyncThunk<
  services.UserLoginResponse,
  services.UserResetPasswordRequest
>(AUTH_ACTION_TYPE.RESET_PASSWORD, async (forgotParam, { rejectWithValue }) => {
  try {
    const res = await services.resetPassword(forgotParam)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

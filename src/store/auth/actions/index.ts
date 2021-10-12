import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/auth.service'
import { AUTH_ACTION_TYPE } from './types'

export const loginByEmail = createAsyncThunk<services.UserLoginResponse, services.UserLoginParams>(
  AUTH_ACTION_TYPE.LOGIN_BY_EMAIL,
  async (loginParam, { rejectWithValue }) => {
    try {
      const res = await services.login(loginParam)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const refreshLogin = createAction<services.UserLoginResponse>(AUTH_ACTION_TYPE.LOGIN_BY_EMAIL)

export const loginSocial = createAsyncThunk<services.UserLoginResponse, services.LoginSocialParams>(
  AUTH_ACTION_TYPE.LOGIN_SOCIAL,
  async (loginParam, { rejectWithValue }) => {
    try {
      const res = await services.loginSocial(loginParam)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const registerByEmail = createAsyncThunk<services.UserLoginResponse, services.UserLoginParams>(
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

export const registerConfirm = createAsyncThunk<services.UserLoginResponse, services.UserConfirmParams>(
  AUTH_ACTION_TYPE.REGISTER_CONFIRM,
  async (confirmParam, { rejectWithValue }) => {
    try {
      const res = await services.registerConfirm(confirmParam)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const signUpResend = createAsyncThunk<services.UserLoginResponse, services.UserResendParams>(
  AUTH_ACTION_TYPE.SIGNUP_RESEND,
  async (resendParams, { rejectWithValue }) => {
    try {
      const res = await services.signUpResend(resendParams)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const forgotResend = createAsyncThunk<services.UserLoginResponse, services.UserResendParams>(
  AUTH_ACTION_TYPE.FORGOT_RESEND,
  async (resendParams, { rejectWithValue }) => {
    try {
      const res = await services.forgotResend(resendParams)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const registerProfile = createAsyncThunk<services.UserProfileResponse, services.UserProfileParams>(
  AUTH_ACTION_TYPE.REGISTER_PROFILE,
  async (registerProfileParam, { rejectWithValue }) => {
    try {
      const res = await services.registerProfile(registerProfileParam)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const forgotPassword = createAsyncThunk<services.ForgotPasswordResponse, services.ForgotPasswordParams>(
  AUTH_ACTION_TYPE.FORGOT_PASSWORD,
  async (forgotParam, { rejectWithValue }) => {
    try {
      await services.forgotPassword(forgotParam)
      return forgotParam
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const forgotConfirm = createAsyncThunk<any, services.UserConfirmParams>(
  AUTH_ACTION_TYPE.FORGOT_CONFIRM,
  async (forgotParam, { rejectWithValue }) => {
    try {
      await services.forgotConfirm(forgotParam)
      return forgotParam
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const resetPassword = createAsyncThunk<services.UserLoginResponse, services.UserResetPasswordParams>(
  AUTH_ACTION_TYPE.RESET_PASSWORD,
  async (forgotParam, { rejectWithValue }) => {
    try {
      const res = await services.resetPassword(forgotParam)
      return res
    } catch (error) {
      if (!error.response) {
        const tempError = { ...error, code: String(error.code) }
        throw tempError
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const logout = createAsyncThunk(AUTH_ACTION_TYPE.LOGOUT, async (_, { rejectWithValue }) => {
  try {
    const res = await services.logout()
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

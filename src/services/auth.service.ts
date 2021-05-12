import api from './api'
import { URI } from '@constants/uri.constants'

export type UserLoginParams = {
  email: string
  password: string
  registration_id?: string
}

export type UserLoginResponse = {
  accessToken?: string
  avatar_url?: string | null
  email: string
  id?: number
  is_social?: boolean
  nickname?: string
  refreshToken?: string
  sign_in_count?: number
  updateStep?: number
  user_code?: string
  confirmation_code?: string
}

export type UserProfileResponse = {
  data: {
    id: string
    type: string
    attributes: UserLoginResponse
  }
}

export type UserRegisterResponse = {
  email: string
}

export type ForgotPasswordParams = UserRegisterResponse

export type ForgotPasswordResponse = UserRegisterResponse

export type UserConfirmParams = {
  email: string
  confirmation_code: string
}

export type UserConfirmResponse = {
  success: string
}

export type UserResetPasswordParams = {
  email: string
  password: string
  password_confirm: string
  confirmation_code: string
}

export type LoginSocialParams = {
  social_channel: 'google' | 'twitter' | 'apple' | 'facebook' | 'line'
  access_token: string
  access_token_secret?: string
  type?: 'login' | 'register'
}

export type UserProfileParams = {
  user_code: string
  nickname: string
}

export const login = async (params: UserLoginParams): Promise<UserLoginResponse> => {
  const { data } = await api.post<UserLoginResponse>(URI.LOGIN, params)
  return data
}

export const loginSocial = async (params: LoginSocialParams): Promise<UserLoginResponse> => {
  const { data } = await api.post<UserLoginResponse>(URI.LOGIN_SOCIAL, params)
  return data
}

export const register = async (params: UserLoginParams): Promise<UserLoginResponse> => {
  const { data } = await api.post<UserLoginResponse>(URI.REGISTER, params)
  return data
}

export const registerConfirm = async (params: UserConfirmParams): Promise<UserLoginResponse> => {
  const { data } = await api.post<UserLoginResponse>(URI.CONFIRM, params)
  return data
}

export const forgotPassword = async (params: ForgotPasswordParams): Promise<ForgotPasswordResponse> => {
  const { data } = await api.post<ForgotPasswordResponse>(URI.FORGOT_PASSWORD, params)
  return data
}

export const forgotConfirm = async (params: UserConfirmParams): Promise<UserConfirmResponse> => {
  const { data } = await api.post<UserConfirmResponse>(URI.FORGOT_CONFIRM, params)
  return data
}

export const resetPassword = async (params: UserResetPasswordParams): Promise<UserLoginResponse> => {
  const { data } = await api.post<UserLoginResponse>(URI.RESET_PASSWORD, params)
  return data
}

export const registerProfile = async (params: UserProfileParams): Promise<UserProfileResponse> => {
  const { data } = await api.put<UserProfileResponse>(URI.REGISTER_PROFILE, params)
  return data
}

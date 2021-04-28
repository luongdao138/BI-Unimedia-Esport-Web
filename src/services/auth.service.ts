import api from './api'
import { URI } from '@constants/uri.constants'

export type UserLoginRequest = {
  email: string
  password: string
  registration_id?: string
}

export type UserLoginResponse = {
  accessToken: string
  avatar_url: string | null
  email: string
  id: number
  is_social: boolean
  nickname: string
  refreshToken: string
  sign_in_count: number
  updateStep: number
  user_code: string
}

export type UserRegisterResponse = {
  email: string
}

export type ForgotPasswordRequest = UserRegisterResponse

export type ForgotPasswordResponse = UserRegisterResponse

export type UserConfirmRequest = {
  email: string
  confirmation_code: string
}

export type UserConfirmResponse = {
  success: string
}

export type UserResetPasswordRequest = {
  email: string
  password: string
  password_confirm: string
  confirmation_code: string
}

export const login = async (
  params: UserLoginRequest
): Promise<UserLoginResponse> => {
  const { data } = await api.post<UserLoginResponse>(URI.LOGIN, params)
  return data
}

export const register = async (
  params: UserLoginRequest
): Promise<UserLoginResponse> => {
  const { data } = await api.post<UserLoginResponse>(URI.REGISTER, params)
  return data
}

export const forgotPassword = async (
  params: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const { data } = await api.post<ForgotPasswordResponse>(
    URI.FORGOT_PASSWORD,
    params
  )
  return data
}

export const forgotConfirm = async (
  params: UserConfirmRequest
): Promise<UserConfirmResponse> => {
  const { data } = await api.post<UserConfirmResponse>(
    URI.FORGOT_CONFIRM,
    params
  )
  return data
}

export const resetPassword = async (
  params: UserResetPasswordRequest
): Promise<UserLoginResponse> => {
  const { data } = await api.post<UserLoginResponse>(URI.RESET_PASSWORD, params)
  return data
}

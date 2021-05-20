import { URI } from '@constants/uri.constants'
import api from './api'

export type UserSettingsResponse = {
  id: string
  type: string
  attributes: {
    email: string
    nickname: string
    user_code: string
    sex: number
    show_sex: boolean
    birth_date: string
    show_birth_date: boolean
    show_area: boolean
    nickname2: string | null
    update_step: number
    area: any | null
    game_titles: string[]
    features: []
  }
}
export type UserFeaturesResponse = {
  id: string
  type: string
  attributes: {
    feature: string
    is_selected: boolean
  }
}[]

export type GameTitlesParam = {
  searchText: string
}

export type GameTitlesResponse = {
  id: string
  type: string
  attributes: {
    display_name: string
    short_name: string
    jp_kana_name: string
    en_name: string
    user_id: any
    image_url: any
  }
}[]

export const getSettings = async (): Promise<UserSettingsResponse> => {
  const { data } = await api.get<UserSettingsResponse>(URI.USER_SETTINGS)
  return data
}

export const getFeatures = async (): Promise<UserFeaturesResponse> => {
  const { data } = await api.get(URI.USER_FEATURES)
  return data.data as UserFeaturesResponse
}

export type SecuritySettingsParam = {
  show_tournament_history: boolean
  show_activity_logs: boolean
  show_about: boolean
}

export type SecuritySettingsResponse = {
  data: SecuritySettings
}

export type SecuritySettings = {
  id: string
  type: 'user_security_setting'
  attributes: {
    show_tournament_history: boolean
    show_activity_logs: boolean
    show_about: boolean
  }
}

export const updateSecuritySettings = async (params: SecuritySettingsParam): Promise<SecuritySettingsResponse> => {
  const { data } = await api.post<SecuritySettingsResponse>(URI.USER_SECURITY_SETTINGS, params)
  return data
}

export const getSecuritySettings = async (): Promise<SecuritySettingsResponse> => {
  const { data } = await api.get<SecuritySettingsResponse>(URI.USER_SECURITY_SETTINGS, {})
  return data
}

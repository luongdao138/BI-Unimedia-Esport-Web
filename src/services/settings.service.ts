import { URI } from '@constants/uri.constants'
import api from './api'

export type UserSettingsResponse = {
  id: string,
  type: string,
  attributes: {
    email: string,
    nickname: string,
    user_code: string,
    sex: number,
    show_sex: boolean,
    birth_date: string,
    show_birth_date: boolean,
    show_area: boolean,
    nickname2: string | null,
    update_step: number,
    area: any | null,
    game_titles: string[],
    features: []
  }
}
export type UserFeaturesResponse = {
  id: string,
  type: string,
  attributes: {
    feature: string;
    is_selected: boolean;
  }
}[]

export type GameTitlesResponse = {
  id: string,
  type: string;
  attributes: {
    display_name: string;
    short_name: string;
    jp_kana_name: string;
    en_name: string;
    user_id: any;
    image_url: any;
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

export const getAllGameTitles = async (): Promise<GameTitlesResponse> => {
  const { data } = await api.get(URI.GAME_TITLES_ALL)
  return data.data as GameTitlesResponse
}

import api from './api'
import { URI } from '@constants/uri.constants'
import { GameTitle } from './game.service'

export type HistorySearchParams = {
  user_id: number
  page: number
}

export type HistorySearchResponse = {
  data: Array<HistoryResponse>
  links: any
}

export type HistoryResponse = {
  attributes: any
}

export type ActivityLogParams = {
  user_id: number
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export type UserProfile = {
  id: string
  type: 'user'
  attributes: {
    email: string
    nickname: string
    user_code: string
    bio?: string | null
    birth_date?: string
    sex?: number
    instagram_link?: string | null
    facebook_link?: string | null
    twitter_link?: string | null
    twitch_link?: string
    show_sex: boolean
    show_area: boolean
    show_birth_date: boolean
    nickname2?: string
    icon?: string | null
    template_id?: number | null
    is_following: boolean
    is_followed: boolean
    is_blocked: boolean
    blocked_by_user: boolean
    followers?: number
    following?: number
    avatar_url?: string | null
    cover_url?: string | null
    area?: null | {
      id?: number
      area?: string
      status?: number
      created_at?: string
      updated_at?: string
    }
    features?: Feature[]
    game_titles?: GameTitle['attributes'][]
    template?: null
    security_settings?: {
      show_tournament_history: boolean
      show_activity_logs: boolean
      show_about: boolean
      allow_messages_from_strangers: boolean
      allow_groups_from_strangers: boolean
    }
    is_deleted: boolean
  }
}

export type Feature = { id: number; feature: string }

export type ProfileResponse = {
  data: UserProfile
}

export type ProfileUpdateParams = {
  sex?: number
  show_sex?: boolean
  birth_date?: string
  show_birth_date?: boolean
  area_id?: number
  show_area?: boolean
  game_titles: number[]
  features: number[]
}

export type ProfileUpdateResponse = {
  data: UserProfile
}

export const getUserProfile = async (): Promise<ProfileResponse> => {
  const { data } = await api.get<ProfileResponse>(URI.USER_DETAIL_PROFILE)
  return data
}

export const profileUpdate = async (params: ProfileUpdateParams): Promise<ProfileUpdateResponse> => {
  const { data } = await api.put<ProfileUpdateResponse>(URI.PROFILE_UPDATE, params)
  return data
}

export const tournamentHistorySearch = async (params: HistorySearchParams): Promise<HistorySearchResponse> => {
  const { data } = await api.get<HistorySearchResponse>(URI.TOURNAMENTS_HISTORY_SEARCH, { params })
  return data
}

export const getActivityLog = async (params: ActivityLogParams): Promise<any> => {
  const { data } = await api.get<any>(URI.PROFILE_ACTIVITY_LOG, { params })
  return data
}

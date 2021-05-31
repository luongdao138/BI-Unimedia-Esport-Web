import api from './api'
import { URI } from '@constants/uri.constants'
import { GameTitle } from './game.service'
import { TournamentListItem } from './tournament.service'

export type HistorySearchParams = {
  page?: number
  user_code: string
}

export type HistorySearchResponse = {
  data: Array<TournamentListItem>
  meta: Meta
}

export type ActivityLogResponse = {
  data: Array<ActivityLog>
  meta: Meta
}

export type ActivityLogParams = {
  page?: number
  user_code: string
}

export type NicknamesResponse = {
  data: CommonResponse
}

export type Nickname2 = {
  id: number
  nickname: string
  subtext: string
}

export type CommonResponse = {
  attributes: any
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export type ActivityLog = {
  attributes: {
    action_type: string
    created_at: string
    description: string
    target_cover_url: string | null
    target_id: number
    target_name: string
    user_avatar_url: string
    user_code: null | number | string
    user_id: number
    user_name: string
  }
}
export type UserProfile = {
  id: string
  type: 'user'
  attributes: {
    email?: string
    nickname?: string
    user_code?: string
    bio?: string | null
    birth_date?: string
    sex?: number
    instagram_link?: string | null
    facebook_link?: string | null
    twitter_link?: string | null
    twitch_link?: string
    discord_link?: string
    show_sex?: boolean
    show_area?: boolean
    show_birth_date?: boolean
    nickname2?: string
    icon?: string | null
    template_id?: number | null
    is_following?: boolean
    is_followed?: boolean
    is_blocked?: boolean
    blocked_by_user?: boolean
    followers?: number
    following?: number
    avatar_url?: string | null
    cover_url?: string | null
    update_step: number
    area_id?: number
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
    is_deleted?: boolean
    home_settings?: string[]
  }
}

export type Feature = { id: number; feature: string }

export type ProfileResponse = {
  data: UserProfile
}

export type ProfileEditParams = {
  sex: number
  show_sex: boolean
  birth_date: string
  show_birth_date: boolean
  area_id?: number
  show_area: boolean
  features: number[]
  nickname: string
  nickname2: string
  bio: string
  instagram_link: string
  facebook_link: string
  twitter_link: string
  twitch_link: string
  discord_link: string
}

export type ProfileImageParams = {
  user_id: number | string
  image_url: string
  file_type: number
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

export type RecommendationsResponse = {
  data: Array<RecommendationsArray>
  links: any
}

type RecommendationsArray = {
  attributes: any
}

export type GameEditParams = {
  game_titles: number[]
}

export type RecommendedEventResponse = {
  data: Array<CommonResponse>
  meta: Meta
}

export type ResultsResponse = {
  attributes: any
}

export type HomeSettingsParams = {
  home_settings: string[]
}

export type HomeSettingsResponse = {
  home_settings: string[]
}

export type FollowResponse = {
  data: {
    id: number | string
    type: 'user'
    attributes: {
      followers: number
      following: number
    }
  }
}

export type UnFollowResponse = {
  success: 'success'
}

export type FollowParams = {
  user_code: string
}

export type RecommendedEventParams = {
  page?: number
}

export const getUserProfile = async (param?: string): Promise<ProfileResponse> => {
  const { data } = await api.get<ProfileResponse>(`${URI.USER_DETAIL_PROFILE}/${param ?? ''}`)
  return data
}

export const profileUpdate = async (params: ProfileUpdateParams): Promise<ProfileUpdateResponse> => {
  const { data } = await api.put<ProfileUpdateResponse>(URI.PROFILE_UPDATE, params)
  return data
}

export const tournamentHistorySearch = async (params: HistorySearchParams): Promise<HistorySearchResponse> => {
  const { data } = await api.post<HistorySearchResponse>(URI.TOURNAMENTS_HISTORY_SEARCH, params)
  return data
}

export const getActivityLog = async (params: ActivityLogParams): Promise<ActivityLogResponse> => {
  const { data } = await api.post<any>(URI.PROFILE_ACTIVITY_LOG, params)
  return data
}

export const getRecommendations = async (): Promise<RecommendationsResponse> => {
  const { data } = await api.post<RecommendationsResponse>(URI.USER_RECOMMENDATIONS)
  return data
}

export const getNicknames = async (): Promise<NicknamesResponse> => {
  const { data } = await api.get<any>(URI.NICKNAMES_2)
  return data
}

export const profileEdit = async (params: ProfileEditParams): Promise<ProfileResponse> => {
  const { data } = await api.put<ProfileResponse>(URI.USER_DETAIL_PROFILE, params)
  return data
}

export const profileImage = async (params: ProfileImageParams): Promise<any> => {
  const { data } = await api.put<any>(URI.USER_PROFILE_IMAGE, params)
  return data
}

export const gameEdit = async (params: GameEditParams): Promise<ProfileResponse> => {
  const { data } = await api.put<ProfileResponse>(URI.GAME_UPDATE, params)
  return data
}

export const getRecommendedEvent = async (params: RecommendedEventParams): Promise<RecommendedEventResponse> => {
  const { data } = await api.post<RecommendedEventResponse>(URI.USER_RECOMMENDED_EVENT, params)
  return data
}

export const updateHomeSettings = async (params: HomeSettingsParams): Promise<HomeSettingsResponse> => {
  const { data } = await api.post<HomeSettingsResponse>(URI.HOME_SETTINGS, params)
  return data
}

export const follow = async (params: FollowParams): Promise<FollowResponse> => {
  const { data } = await api.put(URI.FOLLOW, params)
  return data
}

export const unfollow = async (params: FollowParams): Promise<UnFollowResponse> => {
  const { data } = await api.put(URI.UNFOLLOW, params)
  return data
}

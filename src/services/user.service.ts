import api from './api'
import { URI } from '@constants/uri.constants'
import { GameTitle } from './game.service'
import { TournamentListItem } from './arena.service'
import { FOLLOW_STATES } from '@constants/common.constants'

export type HistorySearchParams = {
  page?: number
  user_code?: string
}

export type FollowStateChangeParam = {
  user_code: string
  isOthers: boolean
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
  user_code?: string
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

export type ChangeEmailSteps = {
  step_check: boolean
  step_change: boolean
}

export type ClearHomeSettings = string[]

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
    hash_key: null | string
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
    is_direct_chat_available?: boolean
    nickname2?: string
    is_following?: boolean
    is_followed?: boolean
    is_blocked?: boolean
    avatar_url?: string | null
    cover_url?: string | null
    update_step: number
    area_id?: number
    area: string
    features?: Feature[]
    game_titles?: GameTitle['attributes'][]
    show_tournament_history: boolean
    show_activity_logs: boolean
    show_about: boolean
    allow_messages_from_strangers: boolean
    allow_groups_from_strangers: boolean
    is_deleted?: boolean
    home_settings?: string[]
    delivery_flag?: boolean //[CW] check is streamer or not streamer
    paid_delivery_flag?: boolean //[CW] check use ticket for live stream
    uuid: string
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
  // nickname2: string
  bio: string
  instagram_link: string
  facebook_link: string
  twitter_link: string
  twitch_link: string
  discord_link: string
}

export type ProfileImageParams = {
  // user_id: number | string
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

export type FollowActionResponse = {
  data: Array<FollowResponse>
}

export type FollowActionResponse2 = {
  res: FollowActionResponse
  param: FollowParams
}

export type UnFollowResponse = {
  success: 'success'
}

export type FollowParams = {
  user_code: string
  isOthers?: boolean
  fromType?: FOLLOW_STATES.FOLLOWERS | FOLLOW_STATES.FOLLOWING
}

export type FollowersParams = {
  page: number
  user_code?: string
}

export type FollowersResponse = {
  data: Array<FollowResponse>
  meta: any
}

export type FollowResponse = {
  attributes: {
    user_code: string
    nickname: string
    nickname2: string
    avatar: string
    is_following: boolean
    is_followed: boolean
    allow_groups_from_strangers: boolean
    allow_messages_from_strangers: boolean
    blocked_by_me: boolean
    blocked_by_user: boolean
  }
}

export type RecommendedEventParams = {
  page?: number
}

export type ChangePasswordParams = {
  current_password: string
  new_password: string
  confirm_new_password: string
}

export type ChangeEmailCheckParams = {
  current_password: string
}

export type ChangeEmailParams = {
  new_email: string
}

export type ChangeEmailConfirmParams = {
  confirmation_code: string
}

export type ChangePasswordResponse = {
  status: 'ok'
}

export type ChangeEmailCheckResponse = {
  success: 'Current Password Correct'
}

export type ChangeEmailResponse = {
  success: 'confirmation code sent'
}

export type ChangeEmailConfirmResponse = {
  email: string
}

export type RemoveProfileImageParams = {
  path: string
  file_type: number
}

export type RemoveProfileImageResponse = {
  success: string
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

export const follow = async (params: FollowParams): Promise<FollowActionResponse> => {
  const { data } = await api.put(URI.FOLLOW, params)
  return data
}

export const unfollow = async (params: FollowParams): Promise<UnFollowResponse> => {
  const { data } = await api.put(URI.UNFOLLOW, params)
  return data
}

export const followers = async (params: FollowersParams): Promise<FollowersResponse> => {
  const { data } = await api.post<FollowersResponse>(URI.FOLLOWERS, params)
  return data
}

export const following = async (params: FollowersParams): Promise<FollowersResponse> => {
  const { data } = await api.post<FollowersResponse>(URI.FOLLOWING, params)
  return data
}

export const changePassword = async (params: ChangePasswordParams): Promise<ChangePasswordResponse> => {
  const { data } = await api.post(URI.USER_CHANGE_PASSWORD, params)
  return data
}

export const changeEmailCheck = async (params: ChangeEmailCheckParams): Promise<ChangeEmailCheckResponse> => {
  const { data } = await api.post(URI.USER_EMAIL_CHANGE_CHECK, params)
  return data
}

export const changeEmail = async (params: ChangeEmailParams): Promise<ChangeEmailResponse> => {
  const { data } = await api.post(URI.USER_EMAIL_CHANGE, params)
  return data
}

export const changeEmailConfirm = async (params: ChangeEmailConfirmParams): Promise<ChangeEmailConfirmResponse> => {
  const { data } = await api.post(URI.USER_EMAIL_CHANGE_CONFIRM, params)
  return data
}

export const profileImageRemove = async (params: RemoveProfileImageParams): Promise<RemoveProfileImageResponse> => {
  const { data } = await api.put<RemoveProfileImageResponse>(URI.IMAGE_REMOVE, params)
  return data
}

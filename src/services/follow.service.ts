import api from './api'
import { URI } from '@constants/uri.constants'

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

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export const followers = async (params: FollowersParams): Promise<FollowersResponse> => {
  const { data } = await api.post<FollowersResponse>(URI.FOLLOWERS, params)
  return data
}

export const following = async (params: FollowersParams): Promise<FollowersResponse> => {
  const { data } = await api.post<FollowersResponse>(URI.FOLLOWING, params)
  return data
}

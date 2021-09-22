import api from './api'
import { URI } from '@constants/uri.constants'

export type UserSearchParams = {
  page: number
  keyword: string
}

export type UserSearchResponse = {
  data: Array<UserResponse>
  meta: Meta
}

export type UserResponse = {
  attributes: any
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export type FollowParams = {
  user_id: number
}

export type SearchParams = {
  type: number
  keyword: string
}

export type CategoryIDParams = {
  type: number
  category_id: number
}

export const userSearch = async (params: UserSearchParams): Promise<UserSearchResponse> => {
  const { data } = await api.post<UserSearchResponse>(URI.USERS_SEARCH, params)
  return data
}

export const follow = async (params: FollowParams): Promise<any> => {
  const { data } = await api.post(URI.FOLLOW, params)
  return data
}

export const unfollow = async (params: FollowParams): Promise<any> => {
  const { data } = await api.post(URI.UNFOLLOW, params)
  return data
}

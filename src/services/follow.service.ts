import api from './api'
import { URI } from '@constants/uri.constants'

export type FollowersParams = {
  page: number
  user_code?: string
}

export type FollowersResponse = {
  data: Array<UserResponse>
  links: any
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

export const followers = async (params: FollowersParams): Promise<FollowersResponse> => {
  const { data } = await api.post<FollowersResponse>(`${URI.FOLLOWERS}/${params.user_code ? params.user_code : ''}`, {})
  return data
}

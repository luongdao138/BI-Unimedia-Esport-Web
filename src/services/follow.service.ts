import api from './api'
import { URI } from '@constants/uri.constants'

export type FollowersParams = {
  page: number
  user_id?: number
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
  const { data } = await api.get<FollowersResponse>(URI.FOLLOWERS, {
    params,
  })
  return data
}

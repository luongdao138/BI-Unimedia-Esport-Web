import api from './api'
import { URI } from '@constants/uri.constants'

export type FollowingParams = {
  page: number
  user_code?: number
}

export type FollowingResponse = {
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

export const following = async (params: FollowingParams): Promise<FollowingResponse> => {
  const { data } = await api.get<FollowingResponse>(URI.FOLLOWING, {
    params,
  })
  return data
}

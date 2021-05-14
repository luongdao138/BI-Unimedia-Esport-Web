import api from './api'
import { URI } from '@constants/uri.constants'

export type FollowingParams = {
  page: number
  user_code?: string
}

export type FollowingResponse = {
  data: Array<UserResponse>
  meta: any
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
  const { data } = await api.post<FollowingResponse>(`${URI.FOLLOWING}/${params.user_code ? params.user_code : ''}`, params)
  return data
}

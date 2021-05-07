import api from './api'
import { URI } from '@constants/uri.constants'

export type UserSearchParams = {
  page: number
  keyword: string
}

export type UserSearchResponse = {
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

export const userSearch = async (params: UserSearchParams): Promise<UserSearchResponse> => {
  const { data } = await api.get<UserSearchResponse>(URI.USERS_SEARCH, {
    params,
  })
  return data
}

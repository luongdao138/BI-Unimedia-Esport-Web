import api from './api'
import { URI } from '@constants/uri.constants'

export enum CommunityFilterOption {
  all = 'all',
  joined = 'joined',
  organized = 'organized',
}

export type CommunitySearchParams = {
  page: number
  keyword: string
  filter?: CommunityFilterOption
}

export type CommunityListResponse = {
  data: Array<CommunityResponse>
  links: any
}

export type CommunityResponse = {
  attributes: any
}

export type PageMeta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export type TopicFollowersResponse = {
  data: Array<FollowersTopicResponse>
  meta: PageMeta
}

export type FollowersTopicResponse = {
  attributes: any
}

export type TopicFollowersParams = {
  page?: number
}

export const communityList = async (params: CommunitySearchParams): Promise<CommunityListResponse> => {
  const { data } = await api.get<CommunityListResponse>(URI.COMMUNITY_LIST, { params })
  return data
}

export const getTopicFollowers = async (params: TopicFollowersParams): Promise<TopicFollowersResponse> => {
  const { data } = await api.post<TopicFollowersResponse>(URI.TOPICS_FOLLOWERS, params)
  return data
}

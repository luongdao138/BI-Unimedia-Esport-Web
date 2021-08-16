import api from './api'
import { URI } from '@constants/uri.constants'

export enum CommunityFilterOption {
  all = 'all',
  participating = 'participating',
  managing = 'managing',
}

export type CommunityListResponse = {
  data: Array<CommunityResponse>
  links: any
}

export type CommunityResponse = {
  attributes: any
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export type TopicFollowersResponse = {
  data: Array<FollowersTopicResponse>
  meta: Meta
}

export type FollowersTopicResponse = {
  attributes: any
}

export type TopicFollowersParams = {
  page?: number
}

export const communityList = async (): Promise<CommunityListResponse> => {
  const { data } = await api.get<CommunityListResponse>(URI.COMMUNITY_LIST)
  return data
}

export const getTopicFollowers = async (params: TopicFollowersParams): Promise<TopicFollowersResponse> => {
  const { data } = await api.post<TopicFollowersResponse>(URI.TOPICS_FOLLOWERS, params)
  return data
}

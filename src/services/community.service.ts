import api from './api'
import { URI } from '@constants/uri.constants'

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

export type CommunityFollowersTopicResponse = {
  data: Array<FollowersTopicResponse>
}

export type FollowersTopicResponse = {
  attributes: any
}

export const communityList = async (): Promise<CommunityListResponse> => {
  const { data } = await api.get<CommunityListResponse>(URI.COMMUNITY_LIST)
  return data
}

export const followersTopic = async (): Promise<CommunityFollowersTopicResponse> => {
  const { data } = await api.get<CommunityFollowersTopicResponse>(URI.COMMUNITY_FOLLOWERS_TOPICS)
  return data
}

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

export type GameTitle = {
  id: number
  display_name: string
}

export type FeatureTitle = {
  id: number
  feature: string
}

export type CommunityDetail = {
  id: string
  type: string
  attributes: {
    id: number
    name: string
    open_range: string
    description: string
    join_condition: string
    area_id: number
    area_name: string
    member_count: number
    cover_image_url: string
    game_titles: GameTitle[]
    features: FeatureTitle[]
    admin: {
      id: number
      nickname: string
      user_code: string
      avatar_image_url: string
    }
  }
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

export type CommunityDetailResponse = {
  data: CommunityDetail
}

export const communityList = async (): Promise<CommunityListResponse> => {
  const { data } = await api.get<CommunityListResponse>(URI.COMMUNITY_LIST)
  return data
}

export const getTopicFollowers = async (params: TopicFollowersParams): Promise<TopicFollowersResponse> => {
  const { data } = await api.post<TopicFollowersResponse>(URI.TOPICS_FOLLOWERS, params)
  return data
}

export const getCommunityDetail = async (hash_key: string): Promise<CommunityDetailResponse> => {
  const { data } = await api.get<CommunityDetailResponse>(URI.COMMUNITY_DETAIL.replace(/:id/gi, hash_key))
  return data
}

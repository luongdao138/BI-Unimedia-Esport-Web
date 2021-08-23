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
  meta: PageMeta
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

export type CommunityFormParams = {
  name: string
  overview: string
  features: number[]
  game_titles: number[]
  open_range: number
  join_condition: number
  area_id: number
  address: string
  cover_image_url: string
}

export interface CreateCommunityResponse {
  id: number
}

export type CommunityFeature = {
  id: string
  type: string
  attributes: {
    feature: string
  }
}

export type CommunityFeaturesResponse = {
  data: Array<CommunityFeature>
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

export type CommunityDetailResponse = {
  data: CommunityDetail
}

export const communityList = async (params: CommunitySearchParams): Promise<CommunityListResponse> => {
  const { data } = await api.get<CommunityListResponse>(URI.COMMUNITY_LIST, { params })
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

export const createCommunity = async (params: CommunityFormParams): Promise<CreateCommunityResponse> => {
  const { data } = await api.post<CreateCommunityResponse>(URI.COMMUNITY_CREATE, params)
  return data
}

export const getCommunityFeatures = async (): Promise<CommunityFeaturesResponse> => {
  const { data } = await api.get<CommunityFeaturesResponse>(URI.COMMUNITY_FEATURES)
  return data
}

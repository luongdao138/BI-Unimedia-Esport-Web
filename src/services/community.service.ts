import api from './api'
import { URI } from '@constants/uri.constants'
import { GameTitle } from './game.service'

export enum CommunityFilterOption {
  all = 'all',
  joined = 'joined',
  organized = 'organized',
}

export type CommunitySearchParams = {
  page: number
  filter?: CommunityFilterOption
}

export type CommunityListResponse = {
  data: Array<CommunityResponse>
  meta: PageMeta
}

type GameTitleItem = GameTitle['attributes']

export type CommunityDetail = {
  id: string
  type: string
  attributes: {
    id: number
    name: string
    open_range: number
    description: string
    join_condition: number
    area_id: number
    area_name: string
    member_count: number
    cover_image_url: string
    address: string
    is_official: number
    game_titles: GameTitleItem[]
    features: CommunityDetailFeature[]
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
  description: string
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

export type UpdateParams = {
  hash_key: string
  data: CommunityFormParams
}

export type UpdateCommunityResponse = {
  id: number
}

export type CommunityDetailFeature = {
  id: number
  feature: string
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
  const { data } = await api.get<CommunityListResponse>(URI.COMMUNITY_LIST_PRIVATE, { params })
  return data
}

export const communityListPublic = async (params: CommunitySearchParams): Promise<CommunityListResponse> => {
  const { data } = await api.get<CommunityListResponse>(URI.COMMUNITY_LIST_PUBLIC, { params })
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

export const updateCommunity = async (params: UpdateParams): Promise<UpdateCommunityResponse> => {
  const { data } = await api.put<UpdateCommunityResponse>(URI.COMMUNITY_UPDATE.replace(/:id/gi, params.hash_key), params.data)
  return data
}

export const getCommunityFeatures = async (): Promise<CommunityFeaturesResponse> => {
  const { data } = await api.get<CommunityFeaturesResponse>(URI.COMMUNITY_FEATURES)
  return data
}

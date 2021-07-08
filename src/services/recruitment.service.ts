import api from './api'
import { URI } from '@constants/uri.constants'

export type RecommendationsResponse = {
  data: Array<RecommendationsArray>
  meta: Meta
}

type RecommendationsArray = {
  attributes: any
}

export type RecruitmentFollowersResponse = {
  data: Array<FollowersArray>
  meta: Meta
}

type FollowersArray = {
  attributes: any
}

export type RecruitmentFollowersParams = {
  page?: number
}

export type RecommendationsParams = {
  page?: number
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export const getRecommendations = async (params: RecommendationsParams): Promise<RecommendationsResponse> => {
  const { data } = await api.post<RecommendationsResponse>(URI.RECRUITMENT_RECOMMENDATIONS, params)
  return data
}

export const getRecruitmentFollowers = async (params: RecruitmentFollowersParams): Promise<RecruitmentFollowersResponse> => {
  const { data } = await api.post<RecruitmentFollowersResponse>(URI.RECRUITMENT_FOLLOWERS, params)
  return data
}

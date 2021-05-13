import api from './api'
import { URI } from '@constants/uri.constants'

export type HistorySearchParams = {
  user_id: number
  page: number
}

export type HistorySearchResponse = {
  data: Array<HistoryResponse>
  links: any
}

export type HistoryResponse = {
  attributes: any
}

export type ActivityLogParams = {
  user_id: number
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export type RecommendationsResponse = {
  data: Array<RecommendationsArray>
  links: any
}

type RecommendationsArray = {
  attributes: any
}

export const getUserProfile = async (): Promise<any> => {
  const { data } = await api.get(URI.USER_DETAIL_PROFILE)
  return data
}

export const tournamentHistorySearch = async (params: HistorySearchParams): Promise<HistorySearchResponse> => {
  const { data } = await api.get<HistorySearchResponse>(URI.TOURNAMENTS_HISTORY_SEARCH, { params })
  return data
}

export const getActivityLog = async (params: ActivityLogParams): Promise<any> => {
  const { data } = await api.get<any>(URI.PROFILE_ACTIVITY_LOG, { params })
  return data
}

export const getRecommendations = async (): Promise<RecommendationsResponse> => {
  const { data } = await api.get<RecommendationsResponse>(URI.USER_RECOMMENDATIONS)
  return data
}

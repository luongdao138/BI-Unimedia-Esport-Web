import api from './api'
import { URI } from '@constants/uri.constants'

export type RecommendationsResponse = {
  data: Array<RecommendationsArray>
}

type RecommendationsArray = {
  attributes: any
}

export type RecruitmentFollowersResponse = {
  data: Array<FollowersArray>
}

type FollowersArray = {
  attributes: any
}

export const getRecommendations = async (): Promise<RecommendationsResponse> => {
  const { data } = await api.post<RecommendationsResponse>(URI.RECRUITMENT_RECOMMENDATIONS)
  return data
}

export const getRecruitmentFollowers = async (): Promise<RecruitmentFollowersResponse> => {
  const { data } = await api.post<RecruitmentFollowersResponse>(URI.RECRUITMENT_FOLLOWERS)
  return data
}

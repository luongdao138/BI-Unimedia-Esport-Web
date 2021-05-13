import api from './api'
import { URI } from '@constants/uri.constants'

export type RecommendedUsersResponse = {
  attributes: any
}

export type TournamentFollowResponse = {
  attributes: any
}

export type TournamentResultResponse = {
  attributes: any
}

export type TopicFollowResponse = {
  attributes: any
}

export const getRecommendedUsers = async (): Promise<RecommendedUsersResponse> => {
  const { data } = await api.post<RecommendedUsersResponse>(URI.RECOMMENDED_USERS)
  return data
}

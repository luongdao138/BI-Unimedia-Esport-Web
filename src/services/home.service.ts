import api from './api'
import { URI } from '@constants/uri.constants'

export type RecommendedUserResponse = {
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

export const getRecommendedUsers = async (): Promise<RecommendedUserResponse> => {
  const { data } = await api.post<RecommendedUserResponse>(URI.RECOMMENDED_USERS)
  return data
}

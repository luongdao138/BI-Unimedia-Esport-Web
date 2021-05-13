import api from './api'
import { URI } from '@constants/uri.constants'

export type RecommendationsResponse = {
  data: Array<RecommendationsArray>
}

type RecommendationsArray = {
  attributes: any
}

export const getRecommendations = async (): Promise<RecommendationsResponse> => {
  const { data } = await api.get<RecommendationsResponse>(URI.RECRUITMENT_RECOMMENDATIONS)
  return data
}

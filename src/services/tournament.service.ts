import api from './api'
import { URI } from '@constants/uri.constants'

export type TournamentSearchParams = {
  page: number
  keyword: string
}

export type TournamentSearchResponse = {
  data: Array<TournamentResponse>
  links: any
}

export type TournamentResponse = {
  attributes: any
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export type TournamentFollowersResponse = {
  data: Array<FollowersResponse>
}

export type FollowersResponse = {
  attributes: any
}

export type TournamentResultsResponse = {
  data: Array<ResultsResponse>
}

export type ResultsResponse = {
  attributes: any
}

export const tournamentSearch = async (params: TournamentSearchParams): Promise<TournamentSearchResponse> => {
  const { data } = await api.post<TournamentSearchResponse>(URI.TOURNAMENTS_SEARCH, params)
  return data
}

export const tournamentFollowers = async (): Promise<TournamentFollowersResponse> => {
  const { data } = await api.get<TournamentFollowersResponse>(URI.TOURNAMENT_FOLLOWERS)
  return data
}

export const tournamentResults = async (): Promise<TournamentResultsResponse> => {
  const { data } = await api.get<TournamentResultsResponse>(URI.TOURNAMENT_RESULTS)
  return data
}

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

export const tournamentSearch = async (params: TournamentSearchParams): Promise<TournamentSearchResponse> => {
  const { data } = await api.get<TournamentSearchResponse>(URI.TOURNAMENTS_SEARCH, {
    params,
  })
  return data
}

import api from './api'
import { URI } from '@constants/uri.constants'
import { TOURNAMENT_STATUS as TS } from '@constants/common.constants'

export type TournamentSearchParams = {
  page: number
  keyword: string
}

export type TournamentSearchResponse = {
  data: Array<TournamentResponse>
  links: any
}

export type TournamentListItem = {
  attributes: {
    title: string
    hash_key: string
    start_date: Date | string
    max_participants: number
    participant_type: number
    status: TS.READY | TS.RECRUITING | TS.RECRUITMENT_CLOSED | TS.READY_TO_START | TS.IN_PROGRESS | TS.COMPLETED | TS.CANCELLED
    game_of_title: string
    cover: null | string
    organizer_name: string
    organizer_avatar: string
    role: 0 | 1 | 2 | 3
    rule: 0 | 1 | 2
    position: number
    team_name: null | string
    team_avatar: null | string
    participant_count: number
    winner: null | {
      name: string
      user_code: string
      profile_image: null | string
    }
    participants: Array<ParticipantType>
  }
}

export type ParticipantType = {
  nickname: string
  profile_image: string | null
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
  meta: Meta
}

export type FollowersResponse = {
  attributes: any
}

export type TournamentResultsResponse = {
  data: Array<ResultsResponse>
  meta: Meta
}

export type ResultsResponse = {
  attributes: any
}

export type RecruitingTournamentResponse = {
  data: Array<RecruitingResponse>
  meta: Meta
}

export type RecruitingResponse = {
  attributes: any
}

export type TournamentResultsParams = {
  page?: number
}

export type TournamentFollowersParams = {
  page?: number
}

export type RecruitingTournamentParams = {
  page?: number
}

export const tournamentSearch = async (params: TournamentSearchParams): Promise<TournamentSearchResponse> => {
  const { data } = await api.post<TournamentSearchResponse>(URI.TOURNAMENTS_SEARCH, params)
  return data
}

export const getTournamentFollowers = async (params: TournamentFollowersParams): Promise<TournamentFollowersResponse> => {
  const { data } = await api.post<TournamentFollowersResponse>(URI.TOURNAMENT_FOLLOWERS, params)
  return data
}

export const getTournamentResults = async (params: TournamentResultsParams): Promise<TournamentResultsResponse> => {
  const { data } = await api.post<TournamentResultsResponse>(URI.TOURNAMENT_RESULTS, params)
  return data
}

export const getRecruitingTournaments = async (params: RecruitingTournamentParams): Promise<RecruitingTournamentResponse> => {
  const { data } = await api.get<RecruitingTournamentResponse>(URI.RECRUITING_TOURNAMENT, { params })
  return data
}

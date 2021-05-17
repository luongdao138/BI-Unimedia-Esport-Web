import api from './api'
import { URI } from '@constants/uri.constants'
import { GameHardware, GameTitle } from './game.service'
import { Feature } from './user.service'

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

export type TournamentDetail = {
  id: string
  type: 'tournament_details'
  attributes: {
    title: string
    overview: string
    notes: string
    rule: 'single' | 'double' | 'battle_royale'
    max_participants: number
    status: 'ready' | 'recruiting' | 'recruitment_closed' | 'ready_to_start' | 'in_progress' | 'completed' | 'cancelled'
    is_freezed: boolean
    start_date: string
    end_date: string
    chat_room_id: string
    acceptance_start_date: string
    acceptance_end_date: string
    participant_type: 0 | 1 | 2 | 3
    area_id: number
    area_name: string
    address: string
    has_prize: boolean
    prize_amount: string
    terms_of_participation: string
    organizer_name: string
    summary: null | string
    background_tpl: number
    has_third_place: boolean
    retain_history: boolean
    t_type: 't_public' | 't_private'
    owner: {
      data: {
        id: 'string'
        type: 'user_list'
        attributes: {
          user_code: string
          nickname: string
          nickname2: null | string
          avatar: null | string
          features: Feature[]
          game_titles: GameTitle['attributes'][]
        }
      }
    }
    game_title: {
      data: GameTitle
    }
    game_hardware: {
      data: GameHardware
    }
    co_organizers: {
      data: []
    }
    cover_image: null | string
    summary_image: null | string
    interested_count: number
    participant_count: number
    my_role: null | string
    my_info: []
    my_position: null | string
    hash_key: string
  }
}

export type TournamentDetailResponse = {
  data: TournamentDetail
}

export const tournamentSearch = async (params: TournamentSearchParams): Promise<TournamentSearchResponse> => {
  const { data } = await api.get<TournamentSearchResponse>(URI.TOURNAMENTS_SEARCH, {
    params,
  })
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

export const getTournamentDetail = async (id: number): Promise<TournamentDetailResponse> => {
  const { data } = await api.get<TournamentDetailResponse>(`/v1/tournaments/details/${id}`)
  return data
}

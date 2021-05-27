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

export type TournamentStatus = 'ready' | 'recruiting' | 'recruitment_closed' | 'ready_to_start' | 'in_progress' | 'completed' | 'cancelled'
export type TournamentRule = 'single' | 'double' | 'battle_royale'
export type TournamentDetail = {
  id: string
  type: 'tournament_details'
  attributes: {
    title: string
    overview: string
    notes: string
    rule: TournamentRule
    max_participants: number
    status: TournamentStatus
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
    is_entered?: boolean
  }
}

export type TournamentCreateParams = {
  title: string
  overview: string
  game_title_id: GameTitle['attributes'][]
  game_hardware_id: number
  has_third_place: boolean
  max_participants: number
  terms_of_participation: string
  acceptance_start_date: string
  acceptance_end_date: string
  start_date: string
  end_date: string
  area_id: number
  area_name: string
  address: string
  has_prize: boolean
  retain_history: boolean
  prize_amount: string
  notes: string
  owner_id: number
  organizer_name: string
  cover_image_url: string
  co_organizers: RecommendedUsers[]
  t_type: 't_public' | 't_private'
  participant_type: number
  status: string
  rule: string
}

export type TournamentFormParams = {
  title: string
  overview: string
  game_title_id: number
  game_hardware_id: number
  has_third_place: boolean
  max_participants: number
  terms_of_participation: string
  acceptance_start_date: string
  acceptance_end_date: string
  start_date: string
  end_date: string
  area_id: number
  area_name: string
  address: string
  has_prize: boolean
  retain_history: boolean
  prize_amount: string
  notes: string
  owner_id: number
  organizer_name: string
  cover_image_url: string
  co_organizers: number[]
  t_type: 't_public' | 't_private'
  participant_type: number
  status: string
  rule: string
}

export type TournamentDetailResponse = {
  data: TournamentDetail
}

export type EntryStatusResponse = {
  is_entry: boolean
}
export type TournamentMatchParticipant = {
  id: number
  role: 'admin' | 'participant' | 'interested' | 'co_organizer'
  name?: string
  team_name?: string
  pid: number
  nickname: string
  user_code: string
}
export type TournamentMatchItem = {
  id: number
  round_no: number
  match_no: number
  score_guest: null | number
  score_home: null | number
  winner: 'home' | 'guest' | null
  bracket: string
  is_edited: boolean
  is_editable: boolean
  home_user: TournamentMatchParticipant | null
  home_avatar: null | string
  guest_user: TournamentMatchParticipant | null
  guest_avatar: null | string
  is_fixed_score: boolean
}

export type TournamentMatchRound = TournamentMatchItem[]

export type TournamentMatchResponse = {
  matches: TournamentMatchRound[]
  third_place_match: TournamentMatchRound
}

export type GetParticipantsParams = {
  page: number
  hash_key: string
}

export type GetParticipantsResponse = {
  data: Array<ParticipantsResponse>
  meta: Meta
}

export type ParticipantsResponse = {
  attributes: any
}

export type TeamJoin = {
  id: number | string
  leader_name: string
  team_name: string
  team_icon_url: string
  members: Array<TeamMember>
}

export type TeamMember = {
  user_id: number
  name: string
}

export type EntryJoin = {
  name: string
}

export type JoinParams = {
  data: TeamJoin | EntryJoin
  hash_key: string
}

export type SummaryParams = {
  data: Summary
  hash_key: string
}

export type Summary = {
  value: string
  summary_image_url: string
}

export type GetSuggestedTeamMembersParams = {
  page: number
  keyword?: string
  tournament_id?: number
  hash_key?: string
}

export type SuggestedTeamMembersResponse = {
  id: string
  type: string
  attributes: any
}

export type GetSuggestedTeamMembersResponse = {
  data: Array<SuggestedTeamMembersResponse>
  links: any
}

export type RecruitingTournamentResponse = {
  data: Array<RecruitingResponse>
}

export type RecruitingResponse = {
  attributes: any
}

export type SetParticipantParams = {
  hash_key?: string
  match_id: number
  participant_id: number | null
  type: string
}
export type PlacementItem = {
  id: number
  user_id: number
  position: number
  name: string
  avatar: null | string
  team?: {
    name: string
  }
  user?: {
    id: number
    nickname: string
    user_code: string
    bio: null | string
  }
}
export type ArenaWinners = Record<string, PlacementItem[]>

export type GetArenaWinnersResponse = {
  matches: ArenaWinners
}
export type RecommendedUsersResponse = {
  data: Array<RecommendedUsers>
  links?: {
    links: any
    meta: Meta
  }
}

export type RecommendedUsers = {
  id: 'string'
  type: 'user_list'
  attributes: {
    user_code: string
    nickname: string
    nickname2: null | string
    avatar: null | string
    features: Feature[] | null
    game_titles: GameTitle['attributes'][] | null
  }
}

export type RecommendedUsersParams = {
  page: number
  keyword: string
  hash_key?: string
}

export type SetScoreParams = {
  hash_key?: string
  match_id: number
  score_home: number
  score_guest: number
  winner: string
}

export const tournamentSearch = async (params: TournamentSearchParams): Promise<TournamentSearchResponse> => {
  const { data } = await api.post<TournamentSearchResponse>(URI.TOURNAMENTS_SEARCH, params)
  return data
}

export const getTournamentFollowers = async (): Promise<TournamentFollowersResponse> => {
  const { data } = await api.post<TournamentFollowersResponse>(URI.TOURNAMENT_FOLLOWERS)
  return data
}

export const getTournamentResults = async (): Promise<TournamentResultsResponse> => {
  const { data } = await api.post<TournamentResultsResponse>(URI.TOURNAMENT_RESULTS)
  return data
}

export const getRecruitingTournaments = async (): Promise<RecruitingTournamentResponse> => {
  const { data } = await api.get<RecruitingTournamentResponse>(URI.RECRUITING_TOURNAMENT)
  return data
}

export const getTournamentDetail = async (hash_key: string | string[]): Promise<TournamentDetailResponse> => {
  const { data } = await api.get<TournamentDetailResponse>(URI.TOURNAMENT_DETAIL.replace(/:id/gi, String(hash_key)))
  return data
}

export const getTournamentParticipants = async (params: GetParticipantsParams): Promise<GetParticipantsResponse> => {
  const { data } = await api.post<GetParticipantsResponse>(URI.TOURNAMENTS_MEMBERS.replace(/:id/gi, params.hash_key), params)
  return data
}

export const getTournamentInteresteds = async (params: GetParticipantsParams): Promise<GetParticipantsResponse> => {
  const { data } = await api.post<GetParticipantsResponse>(URI.TOURNAMENTS_INTERESTEDS.replace(/:id/gi, params.hash_key), params)
  return data
}

export const joinTournament = async (params: JoinParams): Promise<void> => {
  const { data } = await api.post<void>(URI.JOIN_TOURNAMENT.replace(/:id/gi, params.hash_key), params.data)
  return data
}

export const leaveTournament = async (hash_key: string): Promise<void> => {
  const { data } = await api.post<void>(URI.LEAVE_TOURNAMENT.replace(/:id/gi, hash_key))
  return data
}

export const closeTournament = async (hash_key: string): Promise<void> => {
  const { data } = await api.post<void>(URI.CLOSE_TOURNAMENT.replace(/:id/gi, hash_key))
  return data
}

export const getEntryStatus = async (hash_key: string): Promise<EntryStatusResponse> => {
  const { data } = await api.get<EntryStatusResponse>(URI.CHECK_ENTRY_STATUS.replace(/:id/gi, hash_key))
  return data
}

export const getSuggestedTeamMembers = async (params: GetSuggestedTeamMembersParams): Promise<GetSuggestedTeamMembersResponse> => {
  const { data } = await api.post<GetSuggestedTeamMembersResponse>(URI.SUGGESTED_TEAM_MEMBERS, params)
  return data
}

export const getTournamentMatches = async (hash_key: string): Promise<TournamentMatchResponse> => {
  const { data } = await api.get<TournamentMatchResponse>(URI.TOURNAMENTS_MATCHES.replace(/:id/gi, hash_key))
  return data
}

export const setParticipant = async (params: SetParticipantParams): Promise<void> => {
  const { data } = await api.put<void>(URI.TOURNAMENTS_SET_PARTICIPANT.replace(/:id/gi, params.hash_key), params)
  return data
}
export const getArenaWinners = async (params: string | string[]): Promise<GetArenaWinnersResponse> => {
  const { data } = await api.get<GetArenaWinnersResponse>(URI.TOURNAMENTS_WINNERS.replace(/:id/gi, String(params)))
  return data
}
export const getRecommendedUsersByName = async (params: RecommendedUsersParams): Promise<RecommendedUsersResponse> => {
  const { data } = await api.get<RecommendedUsersResponse>(URI.TOURNAMENTS_USERS, { params })
  return data
}

export const createTournament = async (params: TournamentFormParams): Promise<void> => {
  const { data } = await api.post<void>(URI.TOURNAMENTS_CREATE, params)
  return data
}

export const setScore = async (params: SetScoreParams): Promise<void> => {
  const { data } = await api.post<void>(URI.TOURNAMENTS_SET_SCORE.replace(/:id/gi, params.hash_key), params)
  return data
}

export const randomizeTournament = async (hash_key: string): Promise<void> => {
  const { data } = await api.post<void>(URI.TOURNAMENTS_RANDOMIZE_PARTICIPANTS.replace(/:id/gi, hash_key))
  return data
}

export const freezeTournament = async (hash_key: string): Promise<TournamentDetailResponse> => {
  const { data } = await api.post<TournamentDetailResponse>(URI.TOURNAMENTS_FREEZE_PARTICIPANTS.replace(/:id/gi, hash_key))
  return data
}

export const summaryTournament = async (params: SummaryParams): Promise<void> => {
  const { data } = await api.post<void>(URI.SUMMARY_TOURNAMENT.replace(/:id/gi, params.hash_key), params.data)
  return data
}

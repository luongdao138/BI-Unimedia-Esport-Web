import api from './api'
import { URI } from '@constants/uri.constants'
import { GameHardware, GameTitle } from './game.service'
import { Feature } from './user.service'
import { TOURNAMENT_STATUS as TS } from '@constants/common.constants'

export enum TournamentFilterOption {
  all = 'all',
  ready = 'ready',
  recruiting = 'recruiting',
  beforeStart = 'before_start',
  inProgress = 'in_progress',
  completed = 'completed',
  joined = 'joined',
  organized = 'organized',
}

export type TournamentSearchParams = {
  page: number
  keyword: string
  filter?: TournamentFilterOption
}

export type TournamentSearchResponse = {
  data: Array<TournamentResponse>
  meta: Meta
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
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
    is_single: boolean
    winner: null | {
      name: string
      user_code: string
      profile_image: null | string
      position: number
    }
    participant: null | {
      name: string
      user_code: string
      profile_image: null | string
      position: number
    }
    participants: Array<ParticipantType>
    is_freezed: boolean
    interested_count: number
  }
}

export type ParticipantType = {
  nickname: string
  profile_image: string | null
}

export type TournamentResponse = {
  attributes: any
}

export type PageMeta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export type TournamentFollowersResponse = {
  data: Array<FollowersResponse>
  meta: PageMeta
}

export type FollowersResponse = {
  attributes: any
}

export type TournamentResultsResponse = {
  data: Array<ResultsResponse>
  meta: PageMeta
}

export type ResultsResponse = {
  attributes: any
}

export type TournamentStatus = 'ready' | 'recruiting' | 'recruitment_closed' | 'ready_to_start' | 'in_progress' | 'completed' | 'cancelled'
export type TournamentRule = 'single' | 'double' | 'battle_royale'
export type ArenaRole = 'admin' | 'participant' | 'interested' | 'co_organizer'
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
    participant_type: number
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
    my_role: null | ArenaRole
    my_info: { team_id: number }[] | any
    my_position: null | string
    hash_key: string
    is_entered?: boolean
  }
}

export type MyInfo = {
  id: number
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
  address?: string
  has_prize: boolean
  retain_history: boolean
  prize_amount: string
  notes: string
  owner_id?: number
  organizer_name: string
  cover_image_url: string
  co_organizers: RecommendedUsers[]
  t_type: 't_public' | 't_private'
  participant_type: number
  status?: string
  rule: string
}

export type TournamentFormParams = {
  title?: string
  overview?: string
  game_title_id?: number
  game_hardware_id?: number
  has_third_place?: boolean
  max_participants?: number
  terms_of_participation?: string
  acceptance_start_date?: string
  acceptance_end_date?: string
  start_date?: string
  end_date?: string
  area_id?: number
  area_name?: string
  address?: string
  has_prize?: boolean
  retain_history?: boolean
  prize_amount?: string
  notes?: string
  owner_id?: number
  organizer_name?: string
  cover_image_url?: string
  co_organizers?: number[]
  t_type?: 't_public' | 't_private' | -1
  participant_type?: number
  status?: string
  rule?: string | -1
}

export type UpdateParams = {
  hash_key: string
  data: TournamentFormParams
}

export type FreezeMatchItem = {
  id: number
  home_user: number
  guest_user: number
}

export type FreezeMatchParams = {
  hash_key: string
  matches: FreezeMatchItem[] | number[]
}

export type TournamentDetailResponse = {
  data: TournamentDetail
}

export type EntryStatusResponse = {
  is_entry: boolean
}
export type TournamentMatchParticipant = {
  id: number
  role: ArenaRole
  name?: string
  team_name?: string
  pid: number
  nickname: string
  user_code: string
}

export type MatchItemType = 'home' | 'guest'
export type TournamentMatchItem = {
  id: number
  round_no: number
  match_no: number
  score_guest: null | number
  score_home: null | number
  winner: MatchItemType | null
  highlight?: MatchItemType
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
  role?: string
  p_id?: number
}

export type GetParticipantsResponse = {
  data: Array<ParticipantsResponse>
  meta: PageMeta
}

export type ParticipantsResponse = {
  id: number
  attributes: {
    avatar_url: string | null
    name: string
  }
}

export interface TeamMemberBase {
  name: string
}

export interface TeamMember extends TeamMemberBase {
  user_id: number
  nickname?: string
  user_code?: string
}

export interface TeamJoinBase {
  id?: number | string
  team_name: string
  team_icon_url: string
  members: TeamMemberBase[]
}

export interface TeamJoin extends TeamJoinBase {
  leader_name: string
  members: TeamMember[]
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
  attributes: {
    avatar: string
    features: [] | null
    game_titles: [] | null
    nickname: string
    nickname2: string | null
    user_code: string
  }
}

export type GetSuggestedTeamMembersResponse = {
  data: Array<SuggestedTeamMembersResponse>
  links: any
}

export type RecruitingTournamentResponse = {
  data: Array<RecruitingResponse>
  meta: PageMeta
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

export type SetParticipantsParams = {
  hash_key?: string
  pids: number[]
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
    meta: PageMeta
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
export type TournamentResultsParams = {
  page?: number
}

export type TournamentFollowersParams = {
  page?: number
}

export type RecruitingTournamentParams = {
  page?: number
}

export type MatchParticipant = {
  avatar?: string | null
  user?: TournamentMatchParticipant | null
  pid?: number | null
}

export interface CreateTournamentResponse {
  hash_key: string
}

export type ParticipantNameParam = {
  hash_key: string
  pid?: number
}
export type ParticipantNameResponse = {
  data: ParticipantName
}

export type ParticipantName = {
  id: string
  type: string
  attributes: {
    role: string
    position: string | null
    name: string
    show_history: boolean
    is_fixed_score: boolean
    user: {
      id: number
      nickname: string
      user_code: string
    }
    team: any | null
    avatar_url: string
  }
}

export type ParticipantNameParams = {
  data: {
    name: string
  }
  hash_key: string
}

export type TournamentTeamDetail = {
  id: string
  type: string
  attributes: {
    leader_id: number
    name: string
    tournament_id: number
    members: {
      id: number
      user_id: number
      name: string
      nickname: string
      user_code: string
      image_url: string
    }[]
    show_history: boolean
    team_avatar: string
  }
}

export type UpdateTournamentTeamParams = {
  id: string
  data: {
    leader_name: string
    team_name: string
    team_icon_url: string
    members: {
      user_id: number
      name: string
    }[]
  }
}

export type TournamentTeamDetailResponse = {
  data: TournamentTeamDetail
}

export type UpdateTournamentResponse = void

export const tournamentSearch = async (params: TournamentSearchParams): Promise<TournamentSearchResponse> => {
  const { data } = await api.post<TournamentSearchResponse>(URI.TOURNAMENTS_SEARCH, params)
  return data
}

export const getTournamentFollowers = async (params: TournamentFollowersParams): Promise<TournamentFollowersResponse> => {
  const { data } = await api.post<TournamentFollowersResponse>(URI.TOURNAMENT_FOLLOWERS, params)
  return data
}

export const getTournamentResults = async (params: TournamentResultsParams): Promise<TournamentResultsResponse> => {
  const { data } = await api.get<TournamentResultsResponse>(URI.TOURNAMENT_RESULTS, { params })
  return data
}

export const getRecruitingTournaments = async (params: RecruitingTournamentParams): Promise<RecruitingTournamentResponse> => {
  const { data } = await api.get<RecruitingTournamentResponse>(URI.RECRUITING_TOURNAMENT, { params })
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

export const joinTournament = async (params: JoinParams): Promise<{ team_id: number }> => {
  const { data } = await api.post<{ team_id: number }>(URI.JOIN_TOURNAMENT.replace(/:id/gi, params.hash_key), params.data)
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

export const cancelTournament = async (hash_key: string): Promise<void> => {
  const { data } = await api.post<void>(URI.CANCEL_TOURNAMENT.replace(/:id/gi, hash_key))
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

export const setParticipants = async (params: SetParticipantsParams): Promise<void> => {
  const { data } = await api.post<void>(URI.ARENA_SET_PARTICIPANTS.replace(/:id/gi, params.hash_key), params)
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

export const createTournament = async (params: TournamentFormParams): Promise<CreateTournamentResponse> => {
  const { data } = await api.post<CreateTournamentResponse>(URI.TOURNAMENTS_CREATE, params)
  return data
}

export const updateTournament = async (params: UpdateParams): Promise<UpdateTournamentResponse> => {
  const { data } = await api.post<UpdateTournamentResponse>(URI.TOURNAMENTS_UPDATE.replace(/:id/gi, params.hash_key), params.data)
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

export const freezeTournament = async (params: FreezeMatchParams): Promise<TournamentDetailResponse> => {
  const { data } = await api.post<TournamentDetailResponse>(URI.TOURNAMENTS_FREEZE_PARTICIPANTS.replace(/:id/gi, params.hash_key), {
    matches: params.matches,
  })
  return data
}

export const summaryTournament = async (params: SummaryParams): Promise<void> => {
  const { data } = await api.post<void>(URI.SUMMARY_TOURNAMENT.replace(/:id/gi, params.hash_key), params.data)
  return data
}

export const getParticipantName = async (params: ParticipantNameParam): Promise<ParticipantNameResponse> => {
  const { data } = await api.get<ParticipantNameResponse>(URI.TOURNAMENT_PARTICIPANT_NAME.replace(/:id/gi, params.hash_key), {
    params: { pid: params.pid },
  })
  return data
}

export const changeParticipantName = async (params: ParticipantNameParams): Promise<{ name: string }> => {
  await api.post<void>(URI.TOURNAMENT_PARTICIPANT_NAME.replace(/:id/gi, params.hash_key), params.data)
  return {
    name: params.data.name,
  }
}

export const getTournamentTeamDetail = async (teamId: number): Promise<TournamentTeamDetailResponse> => {
  const { data } = await api.get<TournamentTeamDetailResponse>(URI.TOURNAMENT_TEAMS.replace(/:id/gi, `${teamId}`))
  return data
}

export const updateTournamentTeamDetail = async (params: UpdateTournamentTeamParams): Promise<void> => {
  await api.post<TournamentTeamDetailResponse>(URI.TOURNAMENT_TEAMS.replace(/:id/gi, `${params.id}`), params.data)
}

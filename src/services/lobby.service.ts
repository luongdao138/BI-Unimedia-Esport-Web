import api from './api'
import { URI } from '@constants/uri.constants'
import { Feature } from './user.service'
import { GameHardware, GameTitle } from './game.service'
import { ArenaRole } from './arena.service'

export type LobbyStatus =
  | 'open'
  | 'ready'
  | 'recruiting'
  | 'recruitment_closed'
  | 'ready_to_start'
  | 'in_progress'
  | 'completed'
  | 'cancelled' // TODO
export type LobbyRule = 'single' | 'double' | 'battle_royale' // TODO

export type EntryLobbyResponse = {
  data: number
  status: string
}

export type LobbySearchParams = {
  page: number
  keyword: string
  filter?: LobbyFilterOption
}

export enum LobbyFilterOption {
  all = 'all',
  suggested = 'suggested',
  recruiting = 'recruiting',
  joined = 'joined',
  organized = 'organized',
}

export type LobbySearchResponse = {
  data: Array<LobbyResponse>
  meta: PageMeta
}

export type PageMeta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export enum LobbyEntryStatus {
  entered = 0,
  selected = 1,
  notselected = 2,
}

export type LobbyResponse = {
  id: string
  type: string
  attributes: {
    title: string
    start_datetime: string
    entry_start_datetime?: string | null
    entry_end_datetime?: string | null
    max_participants: number
    cover?: string | null
    organizer_name: string
    organizer_avatar?: string | null
    status: number
    entry_status?: LobbyEntryStatus | null
    participant_count: number
    participants: Array<ParticipantsItem>
  }
}

export type CategoryItem = {
  id: number
  type: string
  attributes: {
    id: number
    name: string
  }
}

export type SelectedCategory = {
  id: number
}

export type LobbyUpsertParams = {
  title?: string
  message?: string
  game_title_id?: number
  game_hardware_id?: number
  categories?: Array<SelectedCategory>
  max_participants?: number
  entry_start_datetime?: string
  entry_end_datetime?: string
  start_datetime?: string
  area_id?: number
  address?: string
  organizer_participated?: boolean
  cover_image_url?: string
}

export type ParticipantsResponse = {
  data: ParticipantsData
}

export type ParticipantsData = Array<ParticipantsItem>

export type ParticipantsItem = {
  id: string
  type: string
  attributes: {
    id: number
    user_id: number
    status: number
    nickname: string
    user_code: string
    avatar_url: string
  }
}

export type LobbyCategoriesResponse = {
  data: Array<CategoryItem>
}

export type LobbyDetail = {
  id: string
  type: 'tournament_details'
  attributes: {
    title: string
    overview: string
    notes: string
    rule: LobbyRule
    max_participants: number
    is_organizer_join: boolean
    status: LobbyStatus
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
    categories: {
      data: CategoryItem
    }
  }
}

export interface CreateLobbyResponse {
  data: LobbyDetail
}

export type LobbyDetailResponse = {
  data: LobbyDetail
}

export type UpdateParams = {
  hash_key: string
  data: LobbyUpsertParams
}

export type UpdateLobbyResponse = void

export const entry = async (params: number): Promise<EntryLobbyResponse> => {
  const { data } = await api.post<EntryLobbyResponse>(URI.LOBBY_ENTRY.replace(/:id/gi, params.toString()))
  return data
}

export const unjoin = async (params: number): Promise<EntryLobbyResponse> => {
  const { data } = await api.post<EntryLobbyResponse>(URI.LOBBY_UNJOIN.replace(/:id/gi, params.toString()))
  return data
}

export const cancel = async (params: number): Promise<EntryLobbyResponse> => {
  const { data } = await api.post<EntryLobbyResponse>(URI.LOBBY_CANCEL.replace(/:id/gi, params.toString()))
  return data
}

export const search = async (params: LobbySearchParams): Promise<LobbySearchResponse> => {
  const { data } = await api.post<LobbySearchResponse>(URI.LOBBY_SEARCH, params)
  return data
}

export const participants = async (params: number): Promise<ParticipantsResponse> => {
  const { data } = await api.get<ParticipantsResponse>(URI.LOBBY_CANCEL.replace(/:id/gi, params.toString()))
  return data
}

export const createLobby = async (params: LobbyUpsertParams): Promise<CreateLobbyResponse> => {
  const { data } = await api.post<CreateLobbyResponse>(URI.LOBBY_CREATE, params)
  return data
}

export const updateLobby = async (params: UpdateParams): Promise<UpdateLobbyResponse> => {
  const { data } = await api.post<UpdateLobbyResponse>(URI.TOURNAMENTS_UPDATE.replace(/:id/gi, params.hash_key), params.data)
  return data
}

export const getLobbyCategories = async (): Promise<LobbyCategoriesResponse> => {
  const { data } = await api.get<LobbyCategoriesResponse>(`${URI.LOBBY_CATEGORIES}`)
  return data
}

export const getLobbyDetail = async (hash_key: string | string[]): Promise<LobbyDetailResponse> => {
  const { data } = await api.get<LobbyDetailResponse>(URI.LOBBY_DETAIL.replace(/:id/gi, String(hash_key)))
  return data
}

import api from './api'
import { URI } from '@constants/uri.constants'
import { GameTitle } from './game.service'
import { LOBBY_PARTICIPANT_STATUS, LOBBY_STATUS } from '@constants/lobby.constants'

export type LobbyRule = 'single' | 'double' | 'battle_royale' // TODO

export type EntryLobbyResponse = {
  data: string
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
    status?: null | string
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
  type: 'recruitment_details'
  attributes: {
    address: string
    area_id: number
    area_name: string
    categories: CategoryItem['attributes'][]
    chatroom_id: string //
    cover_image_url: null | string
    entry_count: number //
    entry_end_datetime: string //
    entry_start_datetime: string //
    game_hardware_id: number // data: GameHardware
    game_title: {
      data: GameTitle
    }
    game_title_id: number
    hardware: string
    hash_key: string
    id: number
    is_owner: boolean
    max_participants: number
    message: string
    organizer: {
      id: number
      nickname: string
      user_code: string
    }
    organizer_avatar: null | string
    participant_status: null | LOBBY_PARTICIPANT_STATUS
    participant_count: number
    remain_days: null | number
    start_datetime: string //
    status: LOBBY_STATUS
    title: string
    is_freezed: boolean
    organizer_participated: boolean
  }
}

export interface CreateLobbyResponse {
  hash_key: string
}

export type LobbyDetailResponse = {
  data: LobbyDetail
}

export type UpdateParams = {
  hash_key: string
  data: LobbyUpsertParams
}

export type UpdateLobbyResponse = void

export const entry = async (hash_key: string): Promise<EntryLobbyResponse> => {
  const { data } = await api.post<EntryLobbyResponse>(URI.LOBBY_ENTRY.replace(/:id/gi, hash_key))
  return data
}

export const unjoin = async (hash_key: string): Promise<EntryLobbyResponse> => {
  const { data } = await api.post<EntryLobbyResponse>(URI.LOBBY_UNJOIN.replace(/:id/gi, hash_key))
  return data
}

export const cancel = async (hash_key: string): Promise<EntryLobbyResponse> => {
  const { data } = await api.post<EntryLobbyResponse>(URI.LOBBY_CANCEL.replace(/:id/gi, hash_key))
  return data
}

export const search = async (params: LobbySearchParams): Promise<LobbySearchResponse> => {
  const { data } = await api.post<LobbySearchResponse>(URI.LOBBY_SEARCH, params)
  return data
}

export const participants = async (hash_key: string): Promise<ParticipantsResponse> => {
  const { data } = await api.get<ParticipantsResponse>(URI.LOBBY_CANCEL.replace(/:id/gi, hash_key))
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

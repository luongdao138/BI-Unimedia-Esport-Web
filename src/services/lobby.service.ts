import api from './api'
import { URI } from '@constants/uri.constants'
import { GameTitle, GameHardware } from './game.service'
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
  ready = 'ready',
  recruiting = 'recruiting',
  entry_closed = 'entry_closed',
  in_progress = 'in_progress',
  ended = 'ended',
  joined = 'joined',
  organized = 'organized',
}

export type LobbyFilterItem = {
  type: LobbyFilterOption
  label: string
  loginRequired: boolean
}

export type LobbySearchResponse = {
  data: Array<LobbyListItem>
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

export type LobbyListItem = {
  id: string
  type: string
  attributes: {
    hash_key: string
    cover?: string | null
    title: string
    game_title: string
    start_datetime: string
    entry_start_datetime?: string | null
    entry_end_datetime?: string | null
    max_participants: number
    organizer_name: string
    organizer_avatar?: string | null
    status: number
    entry_status?: LobbyEntryStatus | null
    participant_count: number
    participants: Array<ParticipantsItem['attributes']>
  }
  participantsLimited?: ParticipantType[]
  startDate?: string
  entryEndDate?: string
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
  meta: PageMeta
}

export type AllParticipantsResponse = {
  data: ParticipantsData
}

export type ParticipantType = {
  nickname?: string
  profile_image?: string | null
}

export type ParticipantsData = Array<ParticipantsItem>

export type ParticipantsItem = {
  id: string
  type: string
  pending?: boolean
  attributes: {
    id: number
    user_id: number
    status: number
    nickname: string
    user_code: string
    avatar_url: string
    profile_image?: string
    is_followed: boolean
    is_blocked: boolean
  }
}

export interface ConfirmParticipantItem extends ParticipantsItem {
  checked: boolean
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
    chatroom_id: string
    cover_image_url: null | string
    entry_count: number
    entry_end_datetime: string
    entry_start_datetime: string
    game_hardware: { data: GameHardware }
    game_title: { data: GameTitle }
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
    participants_count: number
    remain_days: null | number
    start_datetime: string
    status: LOBBY_STATUS
    title: string
    is_freezed: boolean
    organizer_participated: boolean
  }
}

export type CreateLobbyResponse = {
  hash_key: string
}

export type UpdateLobbyResponse = {
  hash_key: string
}

export type LobbyDetailResponse = {
  data: LobbyDetail
}

export type UpdateParams = {
  hash_key: string
  data: LobbyUpsertParams
}

export type ConfirmParticipantParams = {
  hash_key: string
  data: {
    participant_ids: Array<number>
  }
}

export type ParticipantParams = {
  hash_key: string
  page: number
}

export type AllParticipantParams = {
  hash_key: string
}

export type RecentLobbiesParams = {
  page?: number
}

export type RecommendedLobbiesParams = {
  page?: number
}

export const entry = async (hash_key: string): Promise<EntryLobbyResponse> => {
  const { data } = await api.post<EntryLobbyResponse>(URI.LOBBY_ENTRY.replace(/:hash_key/gi, hash_key))
  return data
}

export const unjoin = async (hash_key: string): Promise<EntryLobbyResponse> => {
  const { data } = await api.post<EntryLobbyResponse>(URI.LOBBY_UNJOIN.replace(/:hash_key/gi, hash_key))
  return data
}

export const cancel = async (hash_key: string): Promise<EntryLobbyResponse> => {
  const { data } = await api.post<EntryLobbyResponse>(URI.LOBBY_CANCEL.replace(/:hash_key/gi, hash_key))
  return data
}

export const search = async (params: LobbySearchParams): Promise<LobbySearchResponse> => {
  const { data } = await api.post<LobbySearchResponse>(URI.LOBBY_SEARCH, params)
  return data
}

export const randomizeParticipants = async (hash_key: string): Promise<ParticipantsResponse> => {
  const { data } = await api.post<ParticipantsResponse>(URI.LOBBY_RANDOMIZE_PARTICIPANTS.replace(/:hash_key/gi, hash_key))
  return data
}

export const confirmParticipants = async (params: ConfirmParticipantParams): Promise<void> => {
  const { data } = await api.post<void>(URI.LOBBY_CONFIRM_PARTICIPANTS.replace(/:hash_key/gi, params.hash_key), params.data)
  return data
}

export const participants = async (params: ParticipantParams): Promise<ParticipantsResponse> => {
  const { data } = await api.get<ParticipantsResponse>(
    `${URI.LOBBY_PARTICIPANTS.replace(/:hash_key/gi, params.hash_key)}/?page=${params.page}`
  )
  return data
}

export const getAllParticipants = async (params: AllParticipantParams): Promise<AllParticipantsResponse> => {
  const { data } = await api.get<AllParticipantsResponse>(`${URI.LOBBY_ALL_PARTICIPANTS.replace(/:hash_key/gi, params.hash_key)}`)
  return data
}

export const createLobby = async (params: LobbyUpsertParams): Promise<CreateLobbyResponse> => {
  const { data } = await api.post<CreateLobbyResponse>(URI.LOBBY_CREATE, params)
  return data
}

export const updateLobby = async (params: UpdateParams): Promise<UpdateLobbyResponse> => {
  const { data } = await api.put<UpdateLobbyResponse>(URI.LOBBY_UPDATE.replace(/:hash_key/gi, params.hash_key), params.data)
  return data
}

export const getLobbyCategories = async (): Promise<LobbyCategoriesResponse> => {
  const { data } = await api.get<LobbyCategoriesResponse>(`${URI.LOBBY_CATEGORIES}`)
  return data
}

export const getLobbyDetail = async (hash_key: string | string[]): Promise<LobbyDetailResponse> => {
  const { data } = await api.get<LobbyDetailResponse>(URI.LOBBY_DETAIL.replace(/:hash_key/gi, String(hash_key)))
  return data
}

export const getRecentLobbies = async (params: RecentLobbiesParams): Promise<LobbySearchResponse> => {
  const { data } = await api.post<LobbySearchResponse>(URI.LOBBY_RECENTS, params)
  return data
}

export const getRecommendedLobbies = async (params: RecommendedLobbiesParams): Promise<LobbySearchResponse> => {
  const { data } = await api.post<LobbySearchResponse>(URI.LOBBY_RECOMMENDED, params)
  return data
}

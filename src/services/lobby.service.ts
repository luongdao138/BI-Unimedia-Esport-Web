import api from './api'
import { URI } from '@constants/uri.constants'

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

import api from './api'
import { URI } from '@constants/uri.constants'

export type EntryLobbyResponse = {
  data: number
  status: string
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

export const participants = async (params: number): Promise<ParticipantsResponse> => {
  const { data } = await api.get<ParticipantsResponse>(URI.LOBBY_CANCEL.replace(/:id/gi, params.toString()))
  return data
}

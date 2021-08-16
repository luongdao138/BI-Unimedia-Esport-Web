import api from './api'
import { URI } from '@constants/uri.constants'

export type EntryLobbyResponse = {
  data: number
  status: string
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

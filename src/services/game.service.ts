import api from './api'
import { URI } from '@constants/uri.constants'

export type GameGenre = {
  id: string
  type: 'game_genre'
  attributes: {
    id: number
    name: string
    icon: string
  }
}

export type GameTitle = {
  id: string
  type: 'game_title'
  attributes: {
    id?: number
    display_name: string
    short_name?: string
    jp_kana_name?: string
    en_name?: string
  }
}

export type GameHardware = {
  id: 'string'
  type: 'game_hardware'
  attributes: {
    id: number
    name: string
  }
}

export type GameGenreResponse = {
  data: GameGenre[]
}

export type GameTitleResponse = {
  data: GameTitle[]
}

export type CreateGameTitleParams = {
  display_name: string
  game_genre_id: number
}

export type CreateGameTitleResponse = {
  data: GameTitle
}

export const getGameGenres = async (): Promise<GameGenreResponse> => {
  const { data } = await api.get<GameGenreResponse>(URI.GAME_GENRES)
  return data
}

export const getGameByGenreId = async (genreId: number): Promise<GameTitleResponse> => {
  const { data } = await api.get<GameTitleResponse>(`${URI.GAME_TITLES}?genre_id=${genreId}`)
  return data
}

export const getGameByTitle = async (keyword: string): Promise<GameTitleResponse> => {
  const { data } = await api.get<GameTitleResponse>(`${URI.GAME_TITLES}?name=${keyword}`)
  return data
}

export const createGameTitle = async (params: CreateGameTitleParams): Promise<CreateGameTitleResponse> => {
  const { data } = await api.post<CreateGameTitleResponse>(URI.GAME_TITLES, params)
  return data
}

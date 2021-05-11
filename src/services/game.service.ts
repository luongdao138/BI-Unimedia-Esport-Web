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
export type GameGenreResponse = {
  data: GameGenre[]
}

export type GameTitle = {
  id: string
  type: 'game_title'
  attributes: {
    display_name: string
    short_name: string
    jp_kana_name: string
    en_name: string
    user_id: any
    image_url: any
  }
}

export type GameTitleResponse = {
  data: GameTitle[]
}

export const getGameGenres = async (): Promise<GameGenreResponse> => {
  const { data } = await api.get<GameGenreResponse>(URI.GAME_GENRES)
  return data
}

export const getGameByGenreId = async (genreId: number): Promise<GameTitleResponse> => {
  const { data } = await api.get<GameTitleResponse>(`${URI.GAME_TITLES}?genre_id=${genreId}`)
  return data
}

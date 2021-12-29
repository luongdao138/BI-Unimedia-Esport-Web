import api from './api'
import { URI } from '@constants/uri.constants'

export type NgWordsResponse = {
  data: Array<{ attributes: { word: string; created_at: string } }>
}

export const getNgWords = async (): Promise<NgWordsResponse> => {
  const { data } = await api.get<NgWordsResponse>(URI.NG_WORDS)
  return data
}

export const getVideoNgWords = async (): Promise<NgWordsResponse> => {
  const { data } = await api.get<NgWordsResponse>(URI.VIDEO_NG_WORDS)
  return data
}

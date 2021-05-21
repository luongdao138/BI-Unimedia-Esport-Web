import api from './api'
import { URI } from '@constants/uri.constants'

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetPrefecturesParams = {}

export type GetPrefecturesResponse = {
  data: [
    {
      id: string
      type: string
      attributes: {
        area: string
      }
    }
  ]
}

export type HardwareResponse = {
  data: [
    {
      id: string
      type: string
      attributes: {
        id: number
        name: string
      }
    }
  ]
}

export const getPrefectures = async (): Promise<GetPrefecturesResponse> => {
  const { data } = await api.get<GetPrefecturesResponse>(URI.GET_PREFECTURES)
  return data
}

export const getHardwares = async (): Promise<HardwareResponse> => {
  const { data } = await api.get<HardwareResponse>(URI.GAME_HARDWARES)
  return data
}

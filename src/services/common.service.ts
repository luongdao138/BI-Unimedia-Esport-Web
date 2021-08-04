import api from './api'
import { URI } from '@constants/uri.constants'
import _ from 'lodash'

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetPrefecturesParams =
  | {
      isUser: boolean
    }
  | undefined

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
  data: Array<{
    id: string
    type: string
    attributes: {
      id: number
      name: string
    }
  }>
}

export const getPrefectures = async (param?: GetPrefecturesParams): Promise<GetPrefecturesResponse> => {
  const isUser = _.get(param, 'isUser') === true
  let url = URI.GET_PREFECTURES
  if (isUser) {
    url = `${URI.GET_PREFECTURES}?is_user=true`
  }
  const { data } = await api.get<GetPrefecturesResponse>(url)
  return data
}

export const getHardwares = async (): Promise<HardwareResponse> => {
  const { data } = await api.get<HardwareResponse>(URI.GAME_HARDWARES)
  return data
}

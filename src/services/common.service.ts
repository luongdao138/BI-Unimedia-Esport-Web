import api from './api'
import { URI } from '@constants/uri.constants'

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetPrefecturesParams = {}

export type GetPrefecturesResponse = {
  data: any //Array<ProfileResponse>
}

// export type ProfileResponse = {
//   attributes: any
// }

export const getPrefectures = async (params: GetPrefecturesParams): Promise<GetPrefecturesResponse> => {
  const { data } = await api.get<GetPrefecturesResponse>(URI.GET_PREFECTURES, { params })
  return data
}

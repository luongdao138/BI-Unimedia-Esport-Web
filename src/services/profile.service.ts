import api from './api'
import { URI } from '@constants/uri.constants'

export type ProfileUpdateParams = {
  sex: number
  show_sex: boolean
  birth_date: string
  show_birth_date: boolean
  area_id?: number
  show_area: boolean
  game_titles: number[]
  features: number[]
}

export type ProfileUpdateResponse = {
  data: any //Array<ProfileResponse>
}

// export type ProfileResponse = {
//   attributes: any
// }

export const profileUpdate = async (params: ProfileUpdateParams): Promise<ProfileUpdateResponse> => {
  const { data } = await api.put<ProfileUpdateResponse>(URI.PROFILE_UPDATE, params)
  return data
}

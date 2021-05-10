import api from './api'
import { URI } from '@constants/uri.constants'

export type ProfileUpdateParams = {
  prefecture: string
  gender: string
  birthDate: string
  tags: []
  favorite_games: []
}

export type ProfileUpdateResponse = {
  data: any //Array<ProfileResponse>
}

// export type ProfileResponse = {
//   attributes: any
// }

export const profileUpdate = async (params: ProfileUpdateParams): Promise<ProfileUpdateResponse> => {
  const { data } = await api.post<ProfileUpdateResponse>(URI.PROFILE_UPDATE, params)
  return data
}

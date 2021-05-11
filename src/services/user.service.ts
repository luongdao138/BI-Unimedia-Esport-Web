import api from './api'
import { URI } from '@constants/uri.constants'

export const getUserProfile = async (): Promise<any> => {
  const { data } = await api.get(URI.USER_DETAIL_PROFILE)
  return data
}

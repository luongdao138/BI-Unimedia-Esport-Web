import api from './api'
import { URI } from '@constants/uri.constants'
// import { UserProfile } from './user.service'

export type CardAddParams = {
  card_name: string
  card_number: string
  card_expire_date: string
  card_cvc?: string
  is_saved_card?: boolean
}

export const getSavedCards = async (): Promise<any> => {
  const { data } = await api.get<any>(`${URI.GET_LIST_CARDS}/`)
  return data
}

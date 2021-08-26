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

export type SavedCards = {
  card_number: string
  card_seq: string
}

export type SavedCardsResponse = {
  attributes: {
    CardNo: string
    CardSeq: string
    CardType: string
    GMO_SHOP_ID: string
  }
  GMO_SHOP_ID: string
}

export type GetSavedCardsResponse = {
  data: SavedCardsResponse
}

export type ParamsPurchasePointUseNewCard = {
  token: string
  point: number | string
  card_type: number
  is_save_card: boolean
}

export type ParamsPurchasePointUseOldCard = {
  card_seq: number | string
  point: number | string
}

export const getSavedCards = async (): Promise<GetSavedCardsResponse> => {
  const { data } = await api.get<GetSavedCardsResponse>(`${URI.GET_LIST_CARDS}/`)
  return data
}

export const deleteCard = async (card_seq: string): Promise<void> => {
  const { data } = await api.post<void>(URI.DELETE_CARD, { card_seq: card_seq })
  return data
}

export const purchasePointUseNewCard = async (purchase_info: ParamsPurchasePointUseNewCard): Promise<void> => {
  const { data } = await api.post<void>(URI.ADD_CARD, purchase_info)
  return data
}

export const purchasePointUseOldCard = async (purchase_info: ParamsPurchasePointUseOldCard): Promise<void> => {
  const { data } = await api.post<void>(URI.PURCHASE_POINT, purchase_info)
  return data
}

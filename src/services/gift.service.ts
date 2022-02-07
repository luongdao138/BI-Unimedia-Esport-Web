import api from '@services/api'
import { URI } from '@constants/uri.constants'

export type VerifySnsUrlParams = {
  user_id?: number
  sns_url?: string
}

export type VerifySnsUrlResponse = {
  sns_url?: string
  message?: string
  code?: number
}

export const verifySnsUrl = async (params: VerifySnsUrlParams): Promise<VerifySnsUrlResponse> => {
  const { data } = await api.post<VerifySnsUrlResponse>(URI.VERIFY_SNS_URL, params)
  return data
}

export type AddNewGiftMasterRequestParams = {
  data: Array<GiftMasterType>
  user_id: number
}

export type AddNewGiftMasterResponse = {
  message?: string
  code?: number
}

export const addNewGiftMaster = async (params: AddNewGiftMasterRequestParams): Promise<AddNewGiftMasterResponse> => {
  const { data } = await api.post<AddNewGiftMasterResponse>(URI.ADD_NEW_GIFT_MASTER, params)
  return data
}

export type GetAllGiftMasterRequestParams = {
  user_id?: number
  keyword?: string
}

export enum GiftMasterUserType {
  INDIVIDUAL,
  TEAM,
  NO_FILTER,
}

export enum GiftMasterUserStatus {
  DEACTIVE,
  ACTIVE,
  REQUEST,
}

export type GiftMasterType = {
  id?: number
  name?: string
  sns_url?: string
  status?: GiftMasterUserStatus
  image?: string
  type?: GiftMasterUserType
  requested_user_id?: number
}

export type GetAllGiftMasterResponse = {
  message?: string
  code?: number
  data?: Array<GiftMasterType>
}

export const getAllGiftMaster = async (params: GetAllGiftMasterRequestParams): Promise<GetAllGiftMasterResponse> => {
  const { data } = await api.get<GetAllGiftMasterResponse>(URI.GET_ALL_GIFT_MASTER, { params })
  return data
}

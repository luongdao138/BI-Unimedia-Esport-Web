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
  data?: {
    url: string
  }
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
  master_uuid?: string
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

export type CreateNewGiftGroupRequestBody = {
  user_id?: number
  title?: string
  group_id?: string
  group_item?: Array<string>
  timezone?: string
}

export type CreateNewGiftGroupResponse = {
  message?: string
  code?: number
}

export const createNewGiftGroup = async (params: CreateNewGiftGroupRequestBody): Promise<CreateNewGiftGroupResponse> => {
  const { data } = await api.post<CreateNewGiftGroupResponse>(URI.ADD_NEW_GIFT_GROUP, params)
  return data
}

export type GetAllGiftGroupRequest = {
  user_id?: number
  page?: number
  limit?: number
}

export type GiftGroupType = {
  title?: string
  id?: number
  total_master?: number
  group_uuid?: string
}

export type GetAllGiftGroupResponse = {
  message?: string
  code?: number
  data?: {
    total?: number
    groups?: Array<GiftGroupType>
  }
}

export const getAllGiftGroup = async (params: GetAllGiftGroupRequest): Promise<GetAllGiftGroupResponse> => {
  const { data } = await api.get<GetAllGiftGroupResponse>(URI.GET_ALL_GIFT_GROUP, { params })
  return data
}

export type GetGiftGroupDetailRequestParams = {
  user_id?: number
  group_id?: string
}

export type GiftGroupDetail = {
  id?: number
  title?: string
  user_id?: number
  status?: number
  group_uuid?: string
  group_item?: Array<GiftMasterType>
}

export type GetGiftGroupDetailResponse = {
  message?: string
  code?: number
  data?: GiftGroupDetail
}

export const getGiftGroupDetail = async (params: GetGiftGroupDetailRequestParams): Promise<GetGiftGroupDetailResponse> => {
  const { data } = await api.get<GetGiftGroupDetailResponse>(URI.GET_GIFT_GROUP_DETAIL, { params })
  return data
}

export type DeleteGiftGroupRequestParams = {
  user_id?: number
  group_id?: string
}

export const deleteGiftGroup = async (params: DeleteGiftGroupRequestParams): Promise<CreateNewGiftGroupResponse> => {
  const { data } = await api.post<CreateNewGiftGroupResponse>(URI.DELETE_GIFT_GROUP, params)
  return data
}

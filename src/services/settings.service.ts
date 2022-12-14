import { URI } from '@constants/uri.constants'
import api from './api'

export type UserSettingsResponse = {
  id: string
  type: string
  attributes: {
    email: string
    nickname: string
    user_code: string
    sex: number
    show_sex: boolean
    birth_date: string
    show_birth_date: boolean
    show_area: boolean
    nickname2: string | null
    update_step: number
    area: any | null
    game_titles: string[]
    features: []
  }
}
export type UserFeaturesResponse = {
  id: string
  type: string
  attributes: {
    feature: string
    is_selected: boolean
  }
}[]

export type GameTitlesParam = {
  searchText: string
}

export type GameTitlesResponse = {
  id: string
  type: string
  attributes: {
    display_name: string
    short_name: string
    jp_kana_name: string
    en_name: string
    user_id: any
    image_url: any
  }
}[]

export const getSettings = async (): Promise<UserSettingsResponse> => {
  const { data } = await api.get<UserSettingsResponse>(URI.USER_SETTINGS)
  return data
}

export const getFeatures = async (): Promise<UserFeaturesResponse> => {
  const { data } = await api.get(URI.USER_FEATURES)
  return data.data as UserFeaturesResponse
}

export type MyPageSettingsParam = {
  show_tournament_history: boolean
  show_activity_logs: boolean
  show_about: boolean
  allow_groups_from_strangers?: boolean
  allow_messages_from_strangers?: boolean
}

export type MyPageSettingsResponse = {
  data: MyPageSettings
}

export type MyPageSettings = {
  id: string
  type: 'user_security_setting'
  attributes: {
    show_tournament_history: boolean
    show_activity_logs: boolean
    show_about: boolean
  }
}

export const updateSecuritySettings = async ({
  allow_messages_from_strangers: _a,
  allow_groups_from_strangers: _b,
  ...params
}: MyPageSettingsParam): Promise<MyPageSettingsResponse> => {
  const { data } = await api.post<MyPageSettingsResponse>(URI.USER_SECURITY_SETTINGS, params)
  return data
}

export const getSecuritySettings = async (): Promise<MyPageSettingsResponse> => {
  const { data } = await api.get<MyPageSettingsResponse>(URI.USER_SECURITY_SETTINGS, {})
  return data
}

export type MessageSettingsParam = {
  allow_groups_from_strangers: boolean
  allow_messages_from_strangers: boolean
}

export type MessageSettingsResponse = {
  data: MessageSettings
}

export type MessageSettings = {
  id: string
  type: 'user_security_setting'
  attributes: {
    allow_groups_from_strangers: false
    allow_messages_from_strangers: false
  }
}

export const updateMessageSettings = async (params: MessageSettingsParam): Promise<MessageSettingsResponse> => {
  const { data } = await api.post<MessageSettingsResponse>(URI.USER_SECURITY_SETTINGS, params)
  return data
}

export const getMessageSettings = async (): Promise<MessageSettingsResponse> => {
  const { data } = await api.get<MessageSettingsResponse>(URI.USER_SECURITY_SETTINGS, {})
  return data
}

export type BlockedUsersParams = {
  page: number
}

export type BlockedUsersResponse = {
  data: Array<UserResponse>
  meta: Meta
}

export type UserResponse = {
  id: string
  type: string
  attributes: {
    user_code: string
    nickname: null | string
    nickname2?: null | string
    avatar: null | string
    features: any[]
    game_titles: any[]
  }
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export const getBlockedUsers = async (params: BlockedUsersParams): Promise<BlockedUsersResponse> => {
  const { data } = await api.put<BlockedUsersResponse>(URI.BLOCKED_USERS, params)
  return data
}

export type NotificationSettingsResponse = {
  data: NotificationSettings[]
}

export type NotificationSettings = {
  id: string
  type: string
  attributes: {
    id: number
    name: string
    ord: number
    status: boolean
  }
}

export type NotificationSettingsParam = {
  ntypes: {
    id: number
    status: boolean
  }[]
}

export const getNotificationSettings = async (): Promise<NotificationSettingsResponse> => {
  const { data } = await api.get<NotificationSettingsResponse>(URI.NOTIFICATION_SETTINGS)
  return data
}

export const updateNotificationSettings = async (params: NotificationSettingsParam): Promise<NotificationSettingsResponse> => {
  const { data } = await api.put<NotificationSettingsResponse>(URI.NOTIFICATION_UPDATE_SETTINGS, params)
  return data
}

export type InquiryParams = {
  content: string
  title: string
  email: string
}

export type InquiryResponse = {
  attributes: any
}

export const createInquiry = async (params: InquiryParams): Promise<InquiryResponse> => {
  const { data } = await api.post<InquiryResponse>(URI.INQUIRY, params)
  return data
}

export type PurchaseHistoryParams = {
  page: number
}

export type PurchaseHistoryResponse = {
  links?: any
  data: PurchaseHistory[]
}

export type PurchaseHistoryDetailResponse = {
  data: {
    id: string
    type: string
    attributes: {
      id: number
      order_id: string
      price: number
      tax: number
      purchase_datetime: string
      cancel_req_datetime: string
      cancelled_datetime: string
      gmo_payment_status: string
      payment_type: string
      status: number
      history_id: number
      title: string
      description: string
      vendor_name: string
      is_cancellable?: boolean
      cancel_possible_day?: number
      history_status?: number
    }
  }
}

export type PurchaseHistory = {
  id: string
  type: string
  attributes: {
    id: number
    order_id: string
    price: number
    tax: number
    purchase_datetime: string
    cancel_req_datetime: string
    cancelled_datetime: string
    gmo_payment_status: string
    payment_type: string
    status: number
    history_id: number
    title: string
    description: string
    vendor_name: string
    is_cancellable?: boolean
    cancel_possible_day?: number
    history_status?: number
  }
}

export const getPurchaseHistory = async (params: PurchaseHistoryParams): Promise<PurchaseHistoryResponse> => {
  const { data } = await api.get<PurchaseHistoryResponse>(URI.PURCHASE_HISTORY, { params })
  return data
}

export const getPurchaseHistoryDetail = async (id: string): Promise<PurchaseHistoryDetailResponse> => {
  const { data } = await api.get<PurchaseHistoryDetailResponse>(URI.PURCHASE_HISTORY_DETAIL.replace(/:id/gi, id))
  return data
}

export const cancelPurchase = async (id: string): Promise<PurchaseHistoryDetailResponse> => {
  const { data } = await api.post<PurchaseHistoryDetailResponse>(URI.PURCHASE_CANCEL.replace(/:id/gi, id))
  return data
}

export type ArchiveListType = {
  user_id: number
  timezone: string
  page?: number
  limit?: number
}

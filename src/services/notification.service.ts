import api from './api'
import { URI } from '@constants/uri.constants'

export type NotificationListParams = {
  page: number
}

export type NotificationBarListParams = {
  page: number
}

export type NotificationListResponse = {
  data: Array<NotificationResponse>
  meta: Meta
}

export type NotificationBarListResponse = {
  data: Array<NotificationResponse>
}

export type NotificationResponse = {
  attributes: {
    action_type: number
    avatar_url: string
    created_at: string
    created_user_id: number
    full_message: string
    hash_key: null | string
    id: number
    message: string
    nickname: string
    notification_id: number
    ntype_id: number
    room_id: null | string
    seen: boolean
    target_id: number
    user_code: string
    user_id: number
  }
  id: string
  type: string
}

export type NotificationBadgeResponse = {
  badge: number
}

export type NotificationDetailParams = {
  id: number
}

export type NotificationDetailResponse = {
  data: {
    attributes: any
  }
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export const notificationList = async (params: NotificationListParams): Promise<NotificationListResponse> => {
  const { data } = await api.get<NotificationListResponse>(URI.NOTIFICATION_LIST, { params })
  return data
}

export const getNotificationDetail = async (id: number): Promise<NotificationDetailResponse> => {
  const { data } = await api.get<NotificationDetailResponse>(`${URI.NOTIFICATION_DETAIL}/${id}`)
  return data
}

export const getNotificationBadge = async (): Promise<NotificationBadgeResponse> => {
  const { data } = await api.get<NotificationBadgeResponse>(URI.NOTIFICATION_BADGE)
  return data
}

export const getNotificationBarList = async (): Promise<NotificationBarListResponse> => {
  const { data } = await api.get<NotificationBarListResponse>(URI.NOTIFICATION_BADGE_LIST)
  return data
}
export const seenNotificationBadge = async (): Promise<void> => {
  const { data } = await api.put<void>(URI.NOTIFICATION_BADGE_SEEN)
  return data
}

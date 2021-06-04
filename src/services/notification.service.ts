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
  meta: any
}

export type NotificationBarListResponse = {
  data: Array<NotificationResponse>
}

export type NotificationResponse = {
  id: number
  attributes: any
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

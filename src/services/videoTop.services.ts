import { URI } from '@constants/uri.constants'
import api from './api'

export const TYPE_VIDEO_TOP = {
  ALL: 'all',
  SCHEDULE: 'schedule',
  LIVE: 'live',
  ARCHIVE: 'archived',
}
export type ListVideoTopParams = {
  type: string
  page?: number
  limit?: number
}

export type TypeVideo = {
  id?: number
  uuid?: string
  archived_file_url?: string
  thumbnail?: string
  title?: string
  description?: string
  use_ticket?: number
  ticket_price?: number
  share_sns_flag?: number
  stream_url?: string
  stream_key?: string
  publish_flag?: number
  stream_notify_time?: string
  stream_schedule_start_time?: string
  stream_schedule_end_time?: string
  sell_ticket_start_time?: string
  scheduled_flag?: string
  view_count?: number
  live_view_count?: number
  like_count?: number
  unlike_count?: number
  category_name?: string
  user_nickname?: string
  user_avatar?: string
  type?: string
}

export type ListVideoTopResponse = {
  message?: string
  code?: number
  data?: {
    live?: Array<TypeVideo>
    schedule?: Array<TypeVideo>
    archive?: Array<TypeVideo>
  }
}

export type VideoTopData = {
  data?: {
    live?: Array<TypeVideo>
    schedule?: Array<TypeVideo>
    archive?: Array<TypeVideo>
  }
}

export const ListVideoAll = async (params: ListVideoTopParams): Promise<ListVideoTopResponse> => {
  const { data } = await api.get<ListVideoTopResponse>(URI.GET_LIST_VIDEO_TOP, { params })
  return data
}

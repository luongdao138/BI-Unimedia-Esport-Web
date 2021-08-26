import { URI } from '@constants/uri.constants'
import api from './api'

export const TYPE_VIDEO_TOP = {
  ALL: 'all',
  SCHEDULE: 'schedule',
  LIVE: 'live',
  ARCHIVE: 'archived',
  POPULAR: 'popular',
  RELATED: 'related',
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
  status?: number
  archived_end_time?: string
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

export type VideoPopularResponse = {
  message?: string
  code?: number
  data?: Array<CategoryPopularData>
}
export type CategoryPopularData = {
  id: number
  name: string
  count: number
  image: string
  videos: Array<TypeVideo>
}

export type VideoPopularResult = {
  data: Array<TypeVideo>
}

export type BannerItem = {
  id?: number
  title?: string
  url?: string
  target?: string
}

export type BannerResponse = {
  message?: string
  code?: number
  data?: Array<BannerItem>
}

export type VideoTypeLiveResponse = {
  message?: string
  code?: number
  data?: {
    live?: Array<TypeVideo>
  }
}

export type VideoTypeScheduleResponse = {
  message?: string
  code?: number
  data?: {
    schedule?: Array<TypeVideo>
  }
}

export type VideoTypeArchivedResponse = {
  message?: string
  code?: number
  data?: {
    archived?: Array<TypeVideo>
  }
}

export type SearchVideoResponse = {
  message?: string
  code?: number
  data?: {
    total: number
    videos: Array<TypeVideo>
  }
}

export type SearchVideoParams = {
  keyword: string
  page: number
  limit: number
}

export type SearchType = {
  total: number
  videos: Array<TypeVideo>
}

export const ListVideoAll = async (params: ListVideoTopParams): Promise<ListVideoTopResponse> => {
  const { data } = await api.get<ListVideoTopResponse>(URI.GET_LIST_VIDEO_TOP, { params })
  return data
}

export const ListVideoPopular = async (): Promise<VideoPopularResponse> => {
  const { data } = await api.get<VideoPopularResponse>(URI.GET_CATEGORY_POPULAR_VIDEO)
  return data
}

export const GetBanner = async (): Promise<BannerResponse> => {
  const { data } = await api.get<BannerResponse>(URI.GET_BANNER)
  return data
}

export const ListVideoLiveStream = async (params: ListVideoTopParams): Promise<VideoTypeLiveResponse> => {
  const { data } = await api.get<VideoTypeLiveResponse>(URI.GET_LIST_VIDEO_TOP, { params })
  return data
}

export const ListVideoSchedule = async (params: ListVideoTopParams): Promise<VideoTypeScheduleResponse> => {
  const { data } = await api.get<VideoTypeScheduleResponse>(URI.GET_LIST_VIDEO_TOP, { params })
  return data
}

export const ListVideoArchived = async (params: ListVideoTopParams): Promise<VideoTypeArchivedResponse> => {
  const { data } = await api.get<VideoTypeArchivedResponse>(URI.GET_LIST_VIDEO_TOP, { params })
  return data
}

export const ListVideoFavorite = async (): Promise<ListVideoTopResponse> => {
  const { data } = await api.get<ListVideoTopResponse>(URI.GET_VIDEO_FAVORITE)
  return data
}

export const VideoSearch = async (params: SearchVideoParams): Promise<SearchVideoResponse> => {
  const { data } = await api.get<SearchVideoResponse>(URI.SEARCH_VIDEO, { params })
  // console.log("====VideoSearch config===",config)
  return data
}

// import { URI } from '@constants/uri.constants'
// import api from './api'

import api from '@services/api'
import { URI } from '@constants/uri.constants'

export type ArchiveDetailDataType = {
  id: number
  uuid: string
  title: string
  description: string
  thumbnail?: string
  category?: number
  stream_url?: string
  stream_key?: string
  ticket_price?: number
  use_ticket?: boolean | number
  share_sns_flag?: boolean | number
  publish_flag?: boolean | number
  name?: string
  // overview: string
  discord_link?: string
  twitter_link?: string
  instagram_link?: string
  stream_notify_time?: string
  stream_schedule_start_time?: string
  stream_schedule_end_time?: string
  sell_ticket_start_time?: string
  video_publish_end_time?: string
  status?: number
  channel_id?: number
  arn?: string
  scheduled_flag: number
  url_download: string
  convert_status: string
  live_stream_start_time?: string
}

export type TYPE_VIDEO_ARCHIVE = {
  title: string
  thumbnail: string
  uuid: string
  archived_url: string
  publish_flag: number
  scheduled_flag: number
  live_stream_start_time: string
  total_point_chat: string
  total_chat: string
  num_counted_user: number
  convert_status: string
}

export type ArchiveListResponse = {
  code?: number
  message?: number
  data?: { videos: Array<TYPE_VIDEO_ARCHIVE>; total: number }
}

export type ArchiveListRequestParams = {
  user_id: number
  timezone?: string
}

export const getLiveSetting = async (params: ArchiveListRequestParams): Promise<ArchiveListResponse> => {
  const { data } = await api.get<ArchiveListResponse>(URI.GET_STREAMER_LIST_ARCHIVE, { params })
  return data
}

export type ArchiveDetailResponse = {
  code?: number
  message?: string
  data?: ArchiveDetailDataType
}

export type ArchiveDetailRequestParams = {
  user_id?: number
  video_id?: string
  timezone?: string
}

export const getArchiveDetail = async (params: ArchiveDetailRequestParams): Promise<ArchiveDetailResponse> => {
  const { data } = await api.get<ArchiveDetailResponse>(URI.GET_STREAMER_ARCHIVE_DETAIL, { params })
  return data
}

export type UpdateArchiveDetailRequestParams = {
  user_id?: number
  uuid?: string
  thumbnail?: string
  title?: string
  description?: string
  category?: number
  video_publish_end_time?: string
  timezone?: string
}

export type DeleteArchiveVideoRequestParams = {
  user_id?: number
  video_id?: string
}

export type GetCookieRequestParams = {
  // user_id?: number
  video_id?: string
}

export type CookieData = {
  'CloudFront-Expires': any
  'CloudFront-Signature': string
  'CloudFront-Key-Pair-Id': string
  url: string
}

export type GetCookieResponse = {
  code?: number
  message?: number
  data?: CookieData
}

export const updateArchiveDetail = async (params: UpdateArchiveDetailRequestParams): Promise<ArchiveDetailResponse> => {
  const { data } = await api.post<ArchiveDetailResponse>(URI.UPDATE_ARCHIVE_VIDEO, { ...params })
  return data
}

export const deleteArchiveVideo = async (params: DeleteArchiveVideoRequestParams): Promise<ArchiveDetailResponse> => {
  const { data } = await api.post<ArchiveDetailResponse>(URI.DELETE_ARCHIVE_VIDEO, { ...params })
  return data
}
export const getCookieToDownload = async (params: GetCookieRequestParams): Promise<GetCookieResponse> => {
  const { data } = await api.post<GetCookieResponse>(URI.GET_COOKIE_TO_DOWNLOAD, { ...params })
  return data
}

import { URI } from '@constants/uri.constants'
import api from './api'

export const LIMIT_ITEM = 6

export type TypeVideoArchived = {
  id?: number
  uuid?: string
  archived_url?: string
  thumbnail?: string
  title?: string
  description?: string
  category?: number
  use_ticket?: number
  ticket_price?: number
  share_sns_flag?: number
  stream_url?: string
  stream_key?: string
  publish_flag?: number
  stream_notify_time?: string
  live_stream_start_time?: string
  live_stream_end_time?: string
  duration?: string
  stream_schedule_start_time?: string
  stream_schedule_end_time?: string
  archived_end_time?: string
  sell_ticket_start_time?: string
  video_publish_end_time?: string
  scheduled_flag?: number
  view_count?: number
  live_view_count?: number
  like_count: number
  unlike_count: number
  user_id: number
  delete_flag?: string
  status?: number
  created_at?: string
  updated_at?: string
  user_nickname?: string
  user_avatar?: string
  category_name?: string
  type?: string
}

export type ListArchivedVideoStreamResponse = {
  message?: string
  code?: number
  data?: Array<TypeVideoArchived>
}
export type ListArchivedVideoStreamParams = {
  video_id?: string | string[]
  page?: number
  limit?: number
  timezone?: string
}
export type ReactionUserParams = {
  video_id?: string | string[]
  like?: number
  unlike?: number
}
export type ReactionUserResponse = {
  message?: string
  code?: number
  data?: Array<any>
}
export type FollowChannelParams = {
  video_id?: string | string[]
  channel_id?: number
  follow?: number
}
export type FollowChannelResponse = {
  message?: string
  code?: number
  data?: Array<any>
}

export const ListArchivedVideoStream = async (params: ListArchivedVideoStreamParams): Promise<ListArchivedVideoStreamResponse> => {
  const URL = URI.VIDEOS + `${params.video_id}/archived`
  const { data } = await api.get<ListArchivedVideoStreamResponse>(URL, { params })
  return data
}

export const ListRelatedVideoStream = async (params: ListArchivedVideoStreamParams): Promise<ListArchivedVideoStreamResponse> => {
  const URL = URI.VIDEOS + `${params.video_id}/related`
  const { data } = await api.get<ListArchivedVideoStreamResponse>(URL, { params })
  return data
}

export const ReactionUserVideoStream = async (params: ReactionUserParams): Promise<ReactionUserResponse> => {
  const URL = URI.VIDEOS + `${params.video_id}/reaction`
  const reactionParams = {
    like: params.like,
    unlike: params.unlike,
  }
  const { data } = await api.post<ReactionUserResponse>(URL, reactionParams)
  return data
}

export const FollowChannelService = async (params: FollowChannelParams): Promise<FollowChannelResponse> => {
  const { data } = await api.post<ReactionUserResponse>(URI.FOLLOW_CHANNEL, params)
  return data
}

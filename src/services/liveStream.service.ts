import { URI } from '@constants/uri.constants'
import api from './api'

export const baseViewingURL = 'https://exelab.jp/live?vid='
export const TYPE_SETTING = {
  LIVE: 'live',
  SCHEDULE: 'schedule',
}
export const TYPE_SECRET_KEY = {
  GET: 'get',
  RE_NEW: 'new',
  KEY: 'key',
  URL: 'url',
  LIVE: 1,
  SCHEDULE: 0,
}

export type LiveStreamSetting = {
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
}

export type DistributorStepSetting = {
  id?: number
  description?: string
  name?: string
  discord_link?: string
  twitter_link?: string
  instagram_link?: string
}

export type LiveStreamSettingResponse = {
  data: {
    id: number
    uuid: string
    title: string
    description: string
    thumbnail: string
    category: number
    stream_url?: string
    stream_key?: string
    ticket_price?: number
    use_ticket?: boolean
    share_sns_flag?: boolean
    publish_flag?: boolean
    name: string
    overview: string
    discord_link?: string
    twitter_url?: string
    instagram_url?: string
    stream_notify_time?: string
    stream_schedule_start_time?: string
    stream_schedule_end_time?: string
    sell_ticket_start_time?: string
    created_at?: string
    status?: number
  }
}
export type LiveStreamSettingParams = {
  type: string
}
export type SetLiveStreamParams = {
  uuid?: string
  thumbnail?: string
  title: string
  description: string
  category: number
  use_ticket?: string
  ticket_price?: string
  share_sns_flag?: string
  publish_flag?: string
  stream_notify_time: string
  stream_schedule_start_time: string
  stream_schedule_end_time: string
  sell_ticket_start_time: string
  scheduled_flag: 1 | 0
  stream_url: string
  stream_key: string
  status?: string
  video_publish_end_time?: string
}
export type SetLiveStreamResponse = {
  code: number
  message: any
  data: {
    id: number
    uuid: string
    title: string
    description: string
    category: number
    use_ticket?: number
    ticket_price?: string
    share_sns_flag?: number
    publish_flag?: number
    stream_notify_time: string
    stream_schedule_start_time: string
    stream_schedule_end_time: string
    sell_ticket_start_time: string
    scheduled_flag: string
    stream_url: string
    stream_key: string
    status?: number
    user_id?: string
    thumbnail?: string
  }
}

export type StreamUrlAndKeyParams = {
  type: string
  objected: string
  is_live: number
}

export type GetStreamUrlAndKeyResponse = {
  code?: number
  message?: any
  data?: {
    // stream_url: string
    // stream_key: string
    CHANNEL_ARN: string
    INGEST_ENDPOINT: string
    PLAYBACK_URL: string
    STREAM_KEY_VALUE: string
    STREAM_URL: string
    STREAM_KEY_ARN: string
  }
}

export type TYPE_ITEM_CATEGORY = {
  id: number
  name: string
  count_videos: number
}

export type GetCategoryResponse = {
  code: number
  message: any
  data: Array<TYPE_ITEM_CATEGORY>
}

type CHANNEL_DATA = {
  id?: number
  description: string
  name: string
  discord_link?: string
  twitter_link?: string
  instagram_link?: string
  // follow_count?:number
}

export type GetChannelResponse = {
  code: number
  message: any
  data: CHANNEL_DATA
}

export type SetChannelParams = {
  description: string
  name: string
  discord_link?: string
  twitter_link?: string
  instagram_link?: string
}

export type SetChannelResponse = {
  code: number
  message: any
  data: CHANNEL_DATA
}

export const getLiveSetting = async (params: LiveStreamSettingParams): Promise<LiveStreamSettingResponse> => {
  const { data } = await api.get<LiveStreamSettingResponse>(URI.LIVE_SETTING, { params })
  return data
}

export const getScheduleSetting = async (params: LiveStreamSettingParams): Promise<LiveStreamSettingResponse> => {
  const { data } = await api.get<LiveStreamSettingResponse>(URI.LIVE_SETTING, { params })
  return data
}

export const setLiveSetting = async (params: SetLiveStreamParams): Promise<SetLiveStreamResponse> => {
  const { data } = await api.post<SetLiveStreamResponse>(URI.SET_LIVE_SETTING, params)
  return data
}

export const getStreamUrlAndKey = async (params: StreamUrlAndKeyParams): Promise<GetStreamUrlAndKeyResponse> => {
  const { data } = await api.post<GetStreamUrlAndKeyResponse>(URI.STREAM_URL_AND_KEY, params)
  return data
}

export const getCategory = async (): Promise<GetCategoryResponse> => {
  const { data } = await api.get<GetCategoryResponse>(URI.GET_CATEGORY)
  return data
}

export const getChannel = async (): Promise<GetChannelResponse> => {
  const { data } = await api.get<GetChannelResponse>(URI.GET_CHANNEL)
  return data
}

export const setChannel = async (params: SetChannelParams): Promise<SetChannelResponse> => {
  const { data } = await api.post<SetChannelResponse>(URI.SET_CHANNEL, params)
  return data
}

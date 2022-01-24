import { URI } from '@constants/uri.constants'
import api from './api'

export const baseViewingURL = `${process.env.NEXT_PUBLIC_WEB_ENDPOINT}/?vid=`
export const TYPE_SETTING = {
  LIVE: 'live',
  SCHEDULE: 'schedule',
}
export const TYPE_SECRET_KEY = {
  GET: 'get',
  RE_NEW: 'new',
  KEY: 'key',
  URL: 'url',
  LIVE: 0,
  SCHEDULE: 1,
}

export const TYPE_RM = {
  NOTIFY: 'notify',
  PUBLISH: 'publish',
  SELL: 'sell',
  ALL: 'all',
  NEW: 'new',
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
  channel_id?: number
  arn?: string
  uuid_clone?: string
  selected_gift?: boolean
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
  code?: number
  message?: string
  data?: {
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
    channel_id?: number
    arn?: string
    live_stream_start_time?: string
    live_stream_end_time?: string
  }
}
export type LiveStreamSettingParams = {
  type: string
  timezone?: string
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
  timezone?: string
  uuid_clone?: string
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
    channel_progress?: string
  }
}

export type StreamUrlAndKeyParams = {
  type: string
  objected: string
  is_live: number
  is_medialive?: boolean
}

export type GetStreamUrlAndKeyResponse = {
  code?: number
  message?: any
  data?: {
    // stream_url: string
    // stream_key: string
    channel_arn: string
    playback_url: string
    stream_key_value: string
    stream_url: string
    stream_key_arn: string
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

export const CODE_ERROR_RENEW_SPECIAL = {
  CHA099: 'CHA099',
  SERVICE_BUSY: 503,
  STK01: 'STK01',
}

export const TAG_STATUS_RECORD = {
  CREATED_n: null,
  CREATED_in: -1,
  UPDATED_NOT_START: 0,
  LIVE_STREAMING: 1, //STARTED OBS
}

export type LiveStreamReportParams = {
  period?: string
  timezone?: string
}

export type LiveStreamReportResponse = {
  code?: number
  message?: string
  data?: {
    list_dates: Array<string>
    item: {
      total_time_video: number
      total_time_user_watch: number
      total_user_watch: number
      total_user_chat: number
      total_user_chat_premium: number
      total_point: number
      total_point_bonuses: number
    }
  }
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

export type GiftIndividual = {
  index?: number
  name?: string
  number_of_registration: number
}

export const liveStreamReport = async (params: LiveStreamReportParams): Promise<LiveStreamReportResponse> => {
  const { data } = await api.get<LiveStreamReportResponse>(URI.GET_LIVE_STREAM_REPORT, { params })
  return data
}

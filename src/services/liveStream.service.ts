import { URI } from '@constants/uri.constants'
import api from './api'

export const baseViewingURL = 'https://exelab.jp/live?vid='
export const TYPE_SETTING = {
  LIVE: 'live',
  SCHEDULE: 'schedule',
}

export type LiveStreamSetting = {
  id: number
  uuid: string
  title: string
  description: string
  thumbnail: string
  category: string
  stream_url?: string
  stream_key?: string
  ticket_price?: number
  use_ticket?: boolean | 1 | 0
  share_sns_flag?: boolean | 1 | 0
  publish_flag?: boolean | 1 | 0
  channel_name: string
  overview: string
  discord_url?: string
  twitter_url?: string
  instagram_url?: string
  // viewing_url?: string
  // re_thumbnail?: string
  // re_title: string
  // re_description?: string
  // re_category: number
  stream_notify_time?: string
  stream_schedule_start_time?: string
  stream_schedule_end_time?: string
  // re_use_ticket?: boolean
  // re_ticket_price?: number
  sell_ticket_start_time?: string
  // re_share_sns_flag?: boolean
  // re_stream_url?: string
  // re_stream_key?: string
  //TODO: add field 配信を公開する boolean
}

export type LiveStreamSettingResponse = {
  data: {
    id: number
    uuid: string
    title: string
    description: string
    thumbnail: string
    category: string
    stream_url?: string
    stream_key?: string
    ticket_price?: number
    use_ticket?: boolean | 1 | 0
    share_sns_flag?: boolean
    publish_flag?: boolean
    channel_name: string
    overview: string
    discord_url?: string
    twitter_url?: string
    instagram_url?: string
    stream_notify_time?: string
    stream_schedule_start_time?: string
    stream_schedule_end_time?: string
    sell_ticket_start_time?: string
  }
}
export type LiveStreamSettingParams = {
  type: string
}
export type SetLiveStreamParams = {
  uuid: string
  thumbnail?: string
  title: string
  description: string
  category: number
  use_ticket?: string
  ticket_price?: string
  share_sns_flag?: string
  publish_flag?: string
  stream_notify_time: string
  stream_schedule_start_time?: string
  stream_schedule_end_time?: string
  sell_ticket_start_time: string
  scheduled_flag?: 1 | 0
  stream_url?: string
  stream_key?: string
  status?: string
}
export type SetLiveStreamResponse = {
  id: number
}

export const getLiveSetting = async (params: LiveStreamSettingParams): Promise<LiveStreamSettingResponse> => {
  const { data } = await api.get<LiveStreamSettingResponse>(URI.LIVE_SETTING, { params })
  return data
}

export const setLiveSetting = async (params: SetLiveStreamParams): Promise<SetLiveStreamResponse> => {
  const { data } = await api.post<SetLiveStreamResponse>(URI.SET_LIVE_SETTING, { params })
  return data
}

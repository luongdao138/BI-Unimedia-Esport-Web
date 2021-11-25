// import { URI } from '@constants/uri.constants'
// import api from './api'

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
}

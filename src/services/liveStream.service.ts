export type LiveStreamSetting = {
  id: string
  type: 'live_stream_setting'
  attributes: {
    linkUrl: string
    title: string
    description: string
    thumbnail: string
    category: number
    stream_url: string
    stream_key: string
    ticket_price: number
    use_ticket: boolean
    share_sns_flag: boolean
    channel_name: string
    overview: string
    discord_url?: string
    twitter_url?: string
    instagram_url?: string
  }
}

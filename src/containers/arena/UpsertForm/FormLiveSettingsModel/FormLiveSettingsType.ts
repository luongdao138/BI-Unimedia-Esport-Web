export type FormLiveType = {
  stepSettingOne?: {
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
    publish_flag: boolean
    video_publish_end_time?: string
    status?: number
  }
  stepSettingTwo?: {
    uuid: string
    thumbnail: string
    title: string
    description: string
    category: number
    stream_notify_time: string
    stream_schedule_start_time: string
    stream_schedule_end_time: string
    use_ticket: boolean
    ticket_price?: number
    sell_ticket_start_time: string
    share_sns_flag: boolean
    stream_url: string
    stream_key: string
    publish_flag: boolean
    video_publish_end_time?: string
    status?: number
    //cross-fields validations
    schedule_live_date?: string
    notify_live_start_date?: string
    notify_live_end_date?: string
    max_schedule_live_date?: string
    public_time_less_than_start?: string
    public_time_more_than_end?: string
    sell_less_than_start?: string
    sell_optional?: string
  }
  stepSettingThree?: {
    name?: string
    description?: string
    discord_link?: string
    twitter_link?: string
    instagram_link?: string
  }
}

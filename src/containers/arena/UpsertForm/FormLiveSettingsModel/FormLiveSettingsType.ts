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
    //cross-fields validations
    schedule_live_date?: string
    notify_live_start_date?: string
    notify_live_end_date?: string
  }
  stepSettingThree?: {
    name?: string
    description?: string
    discord_link?: string
    twitter_link?: string
    instagram_link?: string
  }
}

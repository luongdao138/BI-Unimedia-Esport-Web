export type FormLiveType = {
  stepSettingOne: {
    linkUrl: string
    title: string
    description: string
    thumbnail: string
    category: string | number
    stream_url: string
    stream_key: string
    ticket_price: number
    use_ticket: boolean
    share_sns_flag: boolean
    publish_flag: boolean
  }
  stepSettingTwo: {
    viewing_url: string
    re_thumbnail: string
    re_title: string
    re_description: string
    re_category: string | number
    date_time_notification_delivery: string
    date_time_schedule_delivery_start: string
    date_time_schedule_end: string
    re_use_ticket: boolean
    re_ticket_price?: number
    date_time_ticket_sale_start: string
    re_share_sns_flag: boolean
    re_stream_url: string
    re_stream_key: string
    re_publish_flag: boolean
    //cross-fields validations
    schedule_live_date?: string
    notify_live_start_date?: string
    notify_live_end_date?: string
  }
  stepSettingThree: {
    channel_name: string
    overview: string
    discord_url?: string
    twitter_url?: string
    instagram_url?: string
  }
}

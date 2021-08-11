import { LiveStreamSetting } from '@services/liveStream.service'
import { FormLiveType } from './FormLiveSettingsType'

export const getInitialLiveSettingValues = (data?: LiveStreamSetting): FormLiveType => ({
  stepSettingOne: {
    linkUrl: data ? data.attributes.linkUrl : 'https://cowell-web.exelab.jp/',
    title: data ? data.attributes.title : '',
    description: data ? data.attributes.description : '',
    thumbnail: data ? data.attributes.thumbnail : '',
    stream_url: data ? data.attributes.stream_url : '',
    stream_key: data ? data.attributes.stream_key : '',
    category: data ? data.attributes.category : -1,
    ticket_price: data ? data.attributes.ticket_price : 0,
    use_ticket: data ? data.attributes.use_ticket : false,
    share_sns_flag: data ? data.attributes.share_sns_flag : false,
  },
  stepSettingTwo: {
    viewing_url: data ? data.attributes.viewing_url : '',
    re_thumbnail: data ? data.attributes.re_thumbnail : '',
    re_title: data ? data.attributes.re_title : '',
    re_description: data ? data.attributes.re_description : '',
    re_category: data ? data.attributes.re_category : -1,
    date_time_notification_delivery: data ? data.attributes.date_time_notification_delivery : null,
    date_time_schedule_delivery_start: data ? data.attributes.date_time_schedule_delivery_start : null,
    date_time_schedule_end: data ? data.attributes.date_time_schedule_end : null,
    re_use_ticket: data ? data.attributes.re_use_ticket : false,
    re_ticket_price: data ? data.attributes.ticket_price : 0,
    date_time_ticket_sale_start: data ? data.attributes.date_time_ticket_sale_start : null,
    re_share_sns_flag: data ? data.attributes.re_share_sns_flag : false,
    re_stream_url: data ? data.attributes.re_stream_url : '',
    re_stream_key: data ? data.attributes.re_stream_key : '',
    //cross-fields validations
    schedule_live_date: '',
    notify_live_start_date: '',
    notify_live_end_date: '',
  },
  stepSettingThree: {
    channel_name: data ? data.attributes.channel_name : '',
    overview: data ? data.attributes.overview : '',
    discord_url: data ? data.attributes.discord_url : '',
    twitter_url: data ? data.attributes.twitter_url : '',
    instagram_url: data ? data.attributes.instagram_url : '',
  },
})

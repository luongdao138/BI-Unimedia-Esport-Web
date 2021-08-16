import { LiveStreamSetting } from '@services/liveStream.service'
import moment from 'moment'
import { FormLiveType } from './FormLiveSettingsType'

export const getInitialLiveSettingValues = (data?: LiveStreamSetting): FormLiveType => ({
  stepSettingOne: {
    linkUrl: data && data.uuid ? data.uuid : '',
    title: data && data.title ? data.title : '',
    description: data && data.description ? data.description : '',
    thumbnail: data && data.thumbnail ? data.thumbnail : '',
    stream_url: data && data.stream_url ? data.stream_url : '',
    stream_key: data && data.stream_key ? data.stream_key : '',
    category: data && data.category ? data.category : -1,
    ticket_price: data && data.ticket_price ? data.ticket_price : 0,
    use_ticket: data && data.use_ticket ? (data.use_ticket === 1 ? true : false) : false,
    share_sns_flag: data && data.share_sns_flag ? (data.share_sns_flag == 1 ? true : false) : false,
    publish_flag: data && data.share_sns_flag ? (data.publish_flag === 1 ? true : false) : true,
  },
  stepSettingTwo: {
    viewing_url: data ? data.uuid : '',
    re_thumbnail: data ? data.thumbnail : '',
    re_title: data ? data.title : '',
    re_description: data ? data.description : '',
    re_category: data ? data.category : null,
    date_time_notification_delivery:
      data && data.stream_notify_time ? moment(data.stream_notify_time).format('YYYY年MM月DD日 HH:mm') : null,
    date_time_schedule_delivery_start: data && data.stream_notify_time ? data.stream_schedule_start_time : null,
    date_time_schedule_end: data && data.stream_notify_time ? data.stream_schedule_end_time : null,
    re_use_ticket: data ? (data.use_ticket === 1 ? true : false) : false,
    re_ticket_price: data ? data.ticket_price : 0,
    date_time_ticket_sale_start: data && data.stream_notify_time ? data.sell_ticket_start_time : null,
    re_share_sns_flag: data ? (data.share_sns_flag === 1 ? true : false) : false,
    re_stream_url: data ? data.stream_url : '',
    re_stream_key: data ? data.stream_key : '',
    re_publish_flag: data ? (data.publish_flag === 1 ? true : false) : true,
    //cross-fields validations
    schedule_live_date: '',
    notify_live_start_date: '',
    notify_live_end_date: '',
  },
  stepSettingThree: {
    channel_name: data ? data.channel_name : '',
    overview: data ? data.overview : '',
    discord_url: data ? data.discord_url : '',
    twitter_url: data ? data.twitter_url : '',
    instagram_url: data ? data.instagram_url : '',
  },
})

import { DistributorStepSetting, LiveStreamSetting } from '@services/liveStream.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
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
    use_ticket: data && data.use_ticket ? (data.use_ticket == 1 ? true : false) : false,
    share_sns_flag: data && data.share_sns_flag ? (data.share_sns_flag == 1 ? true : false) : false,
    publish_flag: data && data.share_sns_flag ? (data.publish_flag == 1 ? true : false) : true,
    public_time: data && data.public_time ? CommonHelper.formatDateTime(data.public_time) : null,
  },
  // stepSettingTwo: {
  //   uuid: data && data.uuid ? data.uuid : '',
  //   thumbnail: data && data.thumbnail ? data.thumbnail : '',
  //   title: data && data.title ? data.title : '',
  //   description: data && data.description ? data.description : '',
  //   category: data && data.category ? data.category : -1,
  //   stream_notify_time: data && data.stream_notify_time ? CommonHelper.formatDateTime(data.stream_notify_time) : null,
  //   stream_schedule_start_time:
  //     data && data.stream_schedule_start_time ? CommonHelper.formatDateTime(data.stream_schedule_start_time) : null,
  //   stream_schedule_end_time: data && data.stream_schedule_end_time ? CommonHelper.formatDateTime(data.stream_schedule_end_time) : null,
  //   use_ticket: data && data.use_ticket ? (data.use_ticket == 1 ? true : false) : false,
  //   ticket_price: data && data.ticket_price ? data.ticket_price : 0,
  //   sell_ticket_start_time: data && data.sell_ticket_start_time ? CommonHelper.formatDateTime(data.sell_ticket_start_time) : null,
  //   share_sns_flag: data && data.share_sns_flag ? (data.share_sns_flag == 1 ? true : false) : false,
  //   stream_url: data && data.stream_url ? data.stream_url : '',
  //   stream_key: data && data.stream_key ? data.stream_key : '',
  //   publish_flag: data && data.publish_flag ? (data.publish_flag == 1 ? true : false) : true,
  //   //cross-fields validations
  //   schedule_live_date: '',
  //   notify_live_start_date: '',
  //   notify_live_end_date: '',
  //   max_schedule_live_date: '',
  // },
  // stepSettingThree: {
  //   name: data && data.name ? data.name : '',
  //   description: data && data.description ? data.description : '',
  //   discord_link: data && data.discord_link ? data.discord_link : '',
  //   twitter_link: data && data.twitter_link ? data.twitter_link : '',
  //   instagram_link: data && data.instagram_link ? data.instagram_link : '',
  // },
})

export const getInitialScheduleValues = (data?: LiveStreamSetting): FormLiveType => ({
  stepSettingTwo: {
    uuid: data && data.uuid ? data.uuid : '',
    thumbnail: data && data.thumbnail ? data.thumbnail : '',
    title: data && data.title ? data.title : '',
    description: data && data.description ? data.description : '',
    category: data && data.category ? data.category : -1,
    stream_notify_time: data && data.stream_notify_time ? CommonHelper.formatDateTime(data.stream_notify_time) : null,
    stream_schedule_start_time:
      data && data.stream_schedule_start_time ? CommonHelper.formatDateTime(data.stream_schedule_start_time) : null,
    stream_schedule_end_time: data && data.stream_schedule_end_time ? CommonHelper.formatDateTime(data.stream_schedule_end_time) : null,
    use_ticket: data && data.use_ticket ? (data.use_ticket == 1 ? true : false) : false,
    ticket_price: data && data.ticket_price ? data.ticket_price : 0,
    sell_ticket_start_time: data && data.sell_ticket_start_time ? CommonHelper.formatDateTime(data.sell_ticket_start_time) : null,
    share_sns_flag: data && data.share_sns_flag ? (data.share_sns_flag == 1 ? true : false) : false,
    stream_url: data && data.stream_url ? data.stream_url : '',
    stream_key: data && data.stream_key ? data.stream_key : '',
    publish_flag: data && data.publish_flag ? (data.publish_flag == 1 ? true : false) : true,
    public_time: data && data.public_time ? CommonHelper.formatDateTime(data.public_time) : null,
    //cross-fields validations
    schedule_live_date: '',
    notify_live_start_date: '',
    notify_live_end_date: '',
    max_schedule_live_date: '',
    public_time_less_than_start: '',
  },
})

export const getInitialDistributorValues = (data?: DistributorStepSetting): FormLiveType => ({
  stepSettingThree: {
    name: data && data.name ? data.name : '',
    description: data && data.description ? data.description : '',
    discord_link: data && data.discord_link ? data.discord_link : '',
    twitter_link: data && data.twitter_link ? data.twitter_link : '',
    instagram_link: data && data.instagram_link ? data.instagram_link : '',
  },
})

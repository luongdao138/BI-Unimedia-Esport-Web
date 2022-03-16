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
    publish_flag: data && data.publish_flag?.toString() ? (data.publish_flag?.toString() == '1' ? true : false) : true,
    video_publish_end_time: data && data.video_publish_end_time ? CommonHelper.formatDateTime(data.video_publish_end_time) : null,
    // video_publish_end_time:
    //   data && data.video_publish_end_time
    //     ? CommonHelper.formatDateTime('2021-09-18 14:00:00')
    //     : null,
    status: data?.status,
    channel_id: data && data.channel_id ? data.channel_id : -1,
    //check step
    step_setting: 1,
    arn: data && data.arn ? data.arn : '',
    uuid_clone: data && data.uuid_clone ? data.uuid_clone : '',
    // use_gift: data && data.use_gift ? (data.use_gift== 1 ? true : false) : false,
    // group_title: data && data.group_title ? data.group_title : '',
    // gift_group_id: data && data.gift_group_id ? data.gift_group_id : null,
    use_gift: data && data.use_gift?.toString() ? (data.use_gift?.toString() == '1' ? true : false) : true,
    group_title: data && data.group_title ? data.group_title : '',
    gift_group_id: data && data.gift_group_id ? data.gift_group_id : null,
    ranking_flag: data && data.ranking_flag ? (data.ranking_flag == 1 ? true : false) : false,
  },
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
    publish_flag: data && data.publish_flag?.toString() ? (data.publish_flag?.toString() == '1' ? true : false) : true,
    video_publish_end_time: data && data.video_publish_end_time ? CommonHelper.formatDateTime(data.video_publish_end_time) : null,
    // video_publish_end_time:
    //   data && data.video_publish_end_time
    //     ? CommonHelper.formatDateTime('2021-09-18 14:00:00')
    //     : CommonHelper.formatDateTime('2021-09-18 14:00:00'),
    status: data && data.status ? data.status : 0,
    channel_id: data && data.channel_id ? data.channel_id : 0,
    //cross-fields validations
    schedule_live_date: '',
    notify_live_start_date: '',
    notify_live_end_date: '',
    max_schedule_live_date: '',
    public_time_less_than_start: '',
    public_time_more_than_end: '',
    sell_less_than_start: '',
    sell_optional: '',
    //check step
    step_setting: 1,
    arn: data && data.arn ? data.arn : '',
    // use_gift: data && data.use_gift ? (data.use_gift== 1 ? true : false) : false,
    // group_title: data && data.group_title ? data.group_title : '',
    // gift_group_id: data && data.gift_group_id ? data.gift_group_id : null,
    use_gift: data && data.use_gift?.toString() ? (data.use_gift?.toString() == '1' ? true : false) : true,
    group_title: data && data.group_title ? data.group_title : '',
    gift_group_id: data && data.gift_group_id ? data.gift_group_id : null,
    ranking_flag: data && data.ranking_flag ? (data.ranking_flag == 1 ? true : false) : false,
  },
})

export const getInitialDistributorValues = (data?: DistributorStepSetting): FormLiveType => ({
  stepSettingThree: {
    name: data && data.name ? data.name : '',
    description: data && data.description ? data.description : '',
    discord_link: data && data.discord_link ? data.discord_link : '',
    twitter_link: data && data.twitter_link ? data.twitter_link : '',
    instagram_link: data && data.instagram_link ? data.instagram_link : '',
    //check step
    step_setting: 1,
    id: data !== null && data.id ? data.id : data === null ? -1 : 0,
  },
})

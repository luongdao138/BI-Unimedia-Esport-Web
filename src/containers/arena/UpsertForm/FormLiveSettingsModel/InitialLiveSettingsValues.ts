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
  // stepSettingTwo:{},
  stepSettingThree: {
    channel_name: data ? data.attributes.channel_name : '',
    overview: data ? data.attributes.overview : '',
    discord_url: data ? data.attributes.discord_url : '',
    twitter_url: data ? data.attributes.twitter_url : '',
    instagram_url: data ? data.attributes.instagram_url : '',
  },
})

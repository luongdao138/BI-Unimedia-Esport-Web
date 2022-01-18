import { ArchiveDetailDataType } from '@services/archiveList.service'
import i18n from '@locales/i18n'
// import moment from 'moment'
import * as Yup from 'yup'

export const validationArchiveDetailScheme = (): any => {
  // const approximateMinDate = moment().subtract(30, 'seconds')
  return Yup.object({
    title: Yup.string()
      .required(i18n.t('common:common.input_required'))
      .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit'))
      .trim(),
    description: Yup.string()
      .required(i18n.t('common:common.input_required'))
      .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit'))
      .trim(),
    category: Yup.mixed().required(i18n.t('common:common.input_required')).notOneOf([-1, ''], i18n.t('common:common.input_required')),
    // use_ticket: Yup.boolean(),
    // ticket_price: Yup.number().when(['use_ticket'], {
    //   is: true,
    //   then: Yup.number()
    //     .required(i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
    //     .min(1, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
    //     .max(9999999, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
    //     .positive(i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
    //     .integer(i18n.t('common:streaming_setting_screen.validation.point_ticket_limit')),
    // }),

    // video_publish_end_time: Yup.date()
    //   .nullable()
    //   // .notRequired()
    //   // .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
    //   .min(approximateMinDate, i18n.t('common:streaming_setting_screen.validation.min_date')),
  })
}

export type ArchiveDetailFormType = {
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
  channel_id?: number
  //check step
  step_setting?: number
  arn?: string
}

export const getInitialArchiveDetailValues = (data?: ArchiveDetailDataType): ArchiveDetailFormType => ({
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
  video_publish_end_time: data && data.video_publish_end_time ? null : null,
  status: data?.status,
  channel_id: data && data.channel_id ? data.channel_id : -1,
  //check step
  step_setting: 1,
  arn: data && data.arn ? data.arn : '',
})

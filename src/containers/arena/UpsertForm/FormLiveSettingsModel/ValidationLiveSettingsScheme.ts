import i18n from '@locales/i18n'
import moment from 'moment'
import * as Yup from 'yup'
export const validationLiveSettingsScheme = (): any => {
  // const minStartDate = new Date()
  // const minEndDate = new Date()
  // const maxSchedule = 3 * 3600000 //1h=3600000ms
  const approximateMinDate = moment().subtract(30, 'seconds')
  return Yup.object({
    stepSettingOne: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit'))
        .trim(),
      description: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit'))
        .trim(),
      category: Yup.mixed().required(i18n.t('common:common.input_required')).notOneOf([-1, ''], i18n.t('common:common.input_required')),
      use_ticket: Yup.boolean(),
      ticket_price: Yup.number().when(['use_ticket'], {
        is: true,
        then: Yup.number()
          .min(1, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
          .max(9999999, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
          .positive(i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
          .integer(i18n.t('common:streaming_setting_screen.validation.point_ticket_limit')),
      }),

      video_publish_end_time: Yup.date()
        // .nullable()
        // .notRequired()
        // .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .min(approximateMinDate, i18n.t('common:streaming_setting_screen.validation.min_date')),
    }),
  })
}

export const validationScheduleScheme = (): any => {
  const minStartDate = new Date()
  const minEndDate = new Date()
  const maxSchedule = 3 * 3600000 //1h=3600000ms
  const approximateMinDate = moment().subtract(30, 'seconds')
  return Yup.object({
    stepSettingTwo: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit'))
        .trim(),
      description: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit'))
        .trim(),
      category: Yup.mixed().when(['use_ticket'], {
        is: (status) => {
          //0-schedule=>update
          return status !== 1
        },
        then: Yup.mixed().required(i18n.t('common:common.input_required')).notOneOf([-1, ''], i18n.t('common:common.input_required')),
      }),

      use_ticket: Yup.boolean(),
      ticket_price: Yup.number().when(['use_ticket'], {
        is: true,
        then: Yup.number()
          .min(1, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
          .max(9999999, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
          .positive(i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
          .integer(i18n.t('common:streaming_setting_screen.validation.point_ticket_limit')),
      }),
      sell_optional: Yup.boolean().when(['use_ticket'], {
        is: true,
        then: Yup.boolean().required(i18n.t('common:streaming_setting_screen.validation.input_required')),
      }),

      sell_ticket_start_time: Yup.date()
        .nullable()
        .when(['use_ticket'], {
          is: true,
          then: Yup.date()
            .nullable()
            .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
            .min(approximateMinDate, i18n.t('common:streaming_setting_screen.validation.min_date')),
        }),

      status: Yup.number().oneOf([0, 1, 2]),

      stream_notify_time: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(minStartDate, i18n.t('common:streaming_setting_screen.validation.min_date')),

      stream_schedule_start_time: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(minStartDate, i18n.t('common:streaming_setting_screen.validation.min_date')),

      stream_schedule_end_time: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(minEndDate, i18n.t('common:streaming_setting_screen.validation.min_date')),

      video_publish_end_time: Yup.date()
        .nullable()
        // .notRequired()
        // .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .min(approximateMinDate, i18n.t('common:streaming_setting_screen.validation.min_date')),

      //cross-fields validations
      schedule_live_date: Yup.string().when(['stream_schedule_start_time', 'stream_schedule_end_time'], {
        is: (stream_schedule_start_time, stream_schedule_end_time) => {
          return Date.parse(stream_schedule_start_time) >= Date.parse(stream_schedule_end_time)
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.start_end_date')),
      }),

      max_schedule_live_date: Yup.string().when(['stream_schedule_start_time', 'stream_schedule_end_time'], {
        is: (stream_schedule_start_time, stream_schedule_end_time) => {
          return Date.parse(stream_schedule_end_time) - Date.parse(stream_schedule_start_time) > maxSchedule
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.max_time_schedule_live')),
      }),

      notify_live_start_date: Yup.string().when(['stream_notify_time', 'stream_schedule_start_time'], {
        is: (stream_notify_time, stream_schedule_start_time) => {
          return Date.parse(stream_notify_time) > Date.parse(stream_schedule_start_time)
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.date_limit')),
      }),
      notify_live_end_date: Yup.string().when(['stream_notify_time', 'stream_schedule_end_time'], {
        is: (stream_notify_time, stream_schedule_end_time) => {
          return Date.parse(stream_notify_time) >= Date.parse(stream_schedule_end_time)
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.date_limit')),
      }),
      public_time_less_than_start: Yup.string().when(['video_publish_end_time', 'stream_schedule_start_time'], {
        is: (video_publish_end_time, stream_schedule_start_time) => {
          return Date.parse(video_publish_end_time) < Date.parse(stream_schedule_start_time)
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.public_time_less')),
      }),
      public_time_more_than_end: Yup.string().when(['video_publish_end_time', 'stream_schedule_end_time'], {
        is: (video_publish_end_time, stream_schedule_end_time) => {
          return Date.parse(video_publish_end_time) < Date.parse(stream_schedule_end_time)
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.public_time_less')),
      }),
      sell_less_than_start: Yup.string().when(['sell_ticket_start_time', 'stream_schedule_start_time'], {
        is: (sell_ticket_start_time, stream_schedule_start_time) => {
          return Date.parse(sell_ticket_start_time) > Date.parse(stream_schedule_start_time)
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.sell_less_than_start')),
      }),
    }),
  })
}

export const validationLDistributorScheme = (): any => {
  return Yup.object({
    stepSettingThree: Yup.object({
      name: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit'))
        .trim(),
      description: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit'))
        .trim(),
    }),
  })
}

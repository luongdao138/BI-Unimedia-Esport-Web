import i18n from '@locales/i18n'
import * as Yup from 'yup'
export const validationLiveSettingsScheme = (): any => {
  const minStartDate = new Date()
  const minEndDate = new Date()
  return Yup.object({
    stepSettingOne: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit')),
      description: Yup.string()
        .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit')),
      category: Yup.mixed()
        .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .notOneOf([-1, ''], i18n.t('common:streaming_setting_screen.validation.input_required')),
      use_ticket: Yup.boolean(),
      ticket_price: Yup.number().when('use_ticket', {
        is: true,
        then: Yup.number()
          .min(1, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
          .max(9999999, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit')),
      }),
    }),
    stepSettingTwo: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit')),
      description: Yup.string()
        .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit')),
      category: Yup.string(),
      use_ticket: Yup.boolean(),
      ticket_price: Yup.number().when('use_ticket', {
        is: true,
        then: Yup.number()
          .min(1, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
          .max(9999999, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit')),
      }),

      sell_ticket_start_time: Yup.date().when('use_ticket', {
        is: true,
        then: Yup.date()
          .nullable()
          // .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
          .min(minStartDate, i18n.t('common:streaming_setting_screen.validation.min_date')),
      }),

      stream_notify_time: Yup.date()
        .nullable()
        .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .min(minStartDate, i18n.t('common:streaming_setting_screen.validation.min_date')),

      stream_schedule_start_time: Yup.date()
        .nullable()
        .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .min(minStartDate, i18n.t('common:streaming_setting_screen.validation.min_date')),
      stream_schedule_end_time: Yup.date()
        .nullable()
        .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .min(minEndDate, i18n.t('common:streaming_setting_screen.validation.min_date')),

      //cross-fields validations
      schedule_live_date: Yup.string().when(['stream_schedule_start_time', 'stream_schedule_end_time'], {
        is: (stream_schedule_start_time, stream_schedule_end_time) => {
          return Date.parse(stream_schedule_start_time) >= Date.parse(stream_schedule_end_time)
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.start_end_date')),
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
    }),
    // stepSettingThree: Yup.object({
    //   name: Yup.string()
    //     .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
    //     .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit')),
    //   description: Yup.string()
    //     .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
    //     .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit')),
    // }),
  })
}

export const validationLDistributorScheme = (): any => {
  return Yup.object({
    stepSettingThree: Yup.object({
      name: Yup.string()
        .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit')),
      description: Yup.string()
        .required(i18n.t('common:streaming_setting_screen.validation.input_required'))
        .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit')),
    }),
  })
}

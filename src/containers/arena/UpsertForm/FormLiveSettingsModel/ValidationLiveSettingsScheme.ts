import i18n from '@locales/i18n'
import * as Yup from 'yup'
export const validationLiveSettingsScheme = (): any => {
  const minStartDate = new Date()
  const minEndDate = new Date()
  return Yup.object({
    stepSettingOne: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit')),
      description: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit')),
      category: Yup.mixed().required(i18n.t('common:common.input_required')).notOneOf([-1, '']),
      use_ticket: Yup.boolean(),
      ticket_price: Yup.number().when('use_ticket', {
        is: true,
        then: Yup.number()
          .min(1, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
          .max(9999999, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit')),
      }),
    }),
    stepSettingTwo: Yup.object({
      re_title: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit')),
      re_description: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit')),
      re_category: Yup.string(),
      re_use_ticket: Yup.boolean(),
      re_ticket_price: Yup.number().when('use_ticket', {
        is: true,
        then: Yup.number()
          .min(1, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit'))
          .max(9999999, i18n.t('common:streaming_setting_screen.validation.point_ticket_limit')),
      }),

      date_time_ticket_sale_start: Yup.date().when('re_use_ticket', {
        is: true,
        then: Yup.date()
          .nullable()
          // .required(i18n.t('common:common.input_required'))
          .min(minStartDate, i18n.t('common:streaming_setting_screen.validation.min_date')),
      }),

      date_time_notification_delivery: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(minStartDate, i18n.t('common:streaming_setting_screen.validation.min_date')),

      date_time_schedule_delivery_start: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(minStartDate, i18n.t('common:streaming_setting_screen.validation.min_date')),
      date_time_schedule_end: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(minEndDate, i18n.t('common:streaming_setting_screen.validation.min_date')),

      //cross-fields validations
      schedule_live_date: Yup.string().when(['date_time_schedule_delivery_start', 'date_time_schedule_end'], {
        is: (date_time_schedule_delivery_start, date_time_schedule_end) => {
          return Date.parse(date_time_schedule_delivery_start) >= Date.parse(date_time_schedule_end)
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.start_end_date')),
      }),

      notify_live_start_date: Yup.string().when(['date_time_notification_delivery', 'date_time_schedule_delivery_start'], {
        is: (date_time_notification_delivery, date_time_schedule_delivery_start) => {
          return Date.parse(date_time_notification_delivery) > Date.parse(date_time_schedule_delivery_start)
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.date_limit')),
      }),
      notify_live_end_date: Yup.string().when(['date_time_notification_delivery', 'date_time_schedule_end'], {
        is: (date_time_notification_delivery, date_time_schedule_end) => {
          return Date.parse(date_time_notification_delivery) >= Date.parse(date_time_schedule_end)
        },
        then: Yup.string().required(i18n.t('common:streaming_setting_screen.validation.date_limit')),
      }),
    }),
    stepSettingThree: Yup.object({
      channel_name: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(100, i18n.t('common:streaming_setting_screen.validation.title_limit')),
      overview: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(5000, i18n.t('common:streaming_setting_screen.validation.overview_limit')),
    }),
  })
}

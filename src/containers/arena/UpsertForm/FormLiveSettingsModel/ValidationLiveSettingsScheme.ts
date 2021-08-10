import i18n from '@locales/i18n'
import * as Yup from 'yup'
export const validationLiveSettingsScheme = (): any => {
  return Yup.object({
    stepSettingOne: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(100, i18n.t('common:common.validation.char_limit', { char_limit: 100 }))
        .min(2, i18n.t('common:common.at_least')),
      description: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(5000, i18n.t('common:common.validation.char_limit', { char_limit: 5000 }))
        .min(2, i18n.t('common:common.at_least')),
      category: Yup.number().min(1, i18n.t('common:common.input_required')).integer(i18n.t('common:common.integer')).notOneOf([-1]),
      ticket_price: Yup.number()
        .min(1, i18n.t('common:streaming_settings_live_streaming_screen.validation.point_ticket_limit'))
        .max(9999999, i18n.t('common:streaming_settings_live_streaming_screen.validation.point_ticket_limit'))
        .positive(i18n.t('common:common.integer')),
    }),
  })
}

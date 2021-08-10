import i18n from '@locales/i18n'
import * as Yup from 'yup'

export const getValidationScheme = (): any => {
  return Yup.object({
    stepOne: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(60, i18n.t('common:common.validation.char_limit', { char_limit: 60 }))
        .min(2, i18n.t('common:common.at_least')),
      overview: Yup.string()
        .nullable()
        .max(191, i18n.t('common:common.validation.char_limit', { char_limit: 191 })),
      tag_title_id: Yup.array().min(1),
      game_title_id: Yup.array(),
      game_hardware_id: Yup.number().nullable().integer(i18n.t('common:common.integer')),
      is_organizer_join: Yup.boolean(),
      area_id: Yup.number(),
      address: Yup.string()
        .nullable()
        .max(60, i18n.t('common:common.validation.char_limit', { char_limit: 60 })),
    }),
  })
}

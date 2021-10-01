import i18n from '@locales/i18n'
import * as Yup from 'yup'

export const getValidationScheme = (): any => {
  return Yup.object({
    stepOne: Yup.object({
      name: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(100, i18n.t('common:common.validation.char_limit', { char_limit: 100 }))
        .min(2, i18n.t('common:common.at_least'))
        .test('empty-check', i18n.t('common:common.input_incorrect'), (val) => {
          if (val && val.length > 1 && val.trim().length === 0) return false
          return true
        }),
      description: Yup.string()
        .nullable()
        .max(5000, i18n.t('common:common.validation.char_limit', { char_limit: 5000 })),
      features: Yup.array(),
      game_titles: Yup.array(),
      area_id: Yup.number(),
      address: Yup.string()
        .nullable()
        .max(5000, i18n.t('common:common.validation.char_limit', { char_limit: 5000 })),
      join_condition: Yup.number().min(0, i18n.t('common:common.input_required')).integer(i18n.t('common:common.integer')),
    }),
  })
}

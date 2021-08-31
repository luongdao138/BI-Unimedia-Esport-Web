import i18n from '@locales/i18n'
import * as Yup from 'yup'

export const getValidationScheme = (): any => {
  return Yup.object({
    stepOne: Yup.object({
      name: Yup.string()
        .strict(true)
        .trim(i18n.t('common:community_create.input_required'))
        .required(i18n.t('common:common.input_required'))
        .max(191, i18n.t('common:common.validation.char_limit', { char_limit: 191 }))
        .min(2, i18n.t('common:common.at_least')),
      description: Yup.string()
        .nullable()
        .max(5000, i18n.t('common:common.validation.char_limit', { char_limit: 5000 })),
      features: Yup.array(),
      game_titles: Yup.array(),
      area_id: Yup.number(),
      address: Yup.string()
        .nullable()
        .max(191, i18n.t('common:common.validation.char_limit', { char_limit: 191 })),
      join_condition: Yup.number().min(0, i18n.t('common:common.input_required')).integer(i18n.t('common:common.integer')),
    }),
  })
}

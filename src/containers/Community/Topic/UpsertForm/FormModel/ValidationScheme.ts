import i18n from '@locales/i18n'
import * as Yup from 'yup'

export const getValidationScheme = (): any => {
  return Yup.object({
    stepOne: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(191, i18n.t('common:common.validation.char_limit', { char_limit: 191 }))
        .min(2, i18n.t('common:common.at_least')),
      content: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(5000, i18n.t('common:common.validation.char_limit', { char_limit: 5000 }))
        .min(2, i18n.t('common:common.at_least')),
    }),
  })
}

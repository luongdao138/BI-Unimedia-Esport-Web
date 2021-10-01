import { ONLY_SPACE_REGEX } from '@constants/community.constants'
import i18n from '@locales/i18n'
import * as Yup from 'yup'

export const getValidationScheme = (): any => {
  return Yup.object({
    stepOne: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(60, i18n.t('common:common.validation.char_limit', { char_limit: 60 }))
        .min(2, i18n.t('common:common.at_least'))
        .test('empty-check', i18n.t('common:common.input_incorrect'), (val) => {
          if (val && val.length > 1 && val.trim().length === 0) return false
          return true
        }),
      content: Yup.string()
        .matches(ONLY_SPACE_REGEX, i18n.t('common:common.input_required'))
        .required(i18n.t('common:common.input_required'))
        .max(5000, i18n.t('common:common.validation.char_limit', { char_limit: 5000 })),
    }),
  })
}

import { ONLY_SPACE_REGEX } from '@constants/community.constants'
import i18n from '@locales/i18n'
import * as Yup from 'yup'

export const getValidationScheme = (): any => {
  return Yup.object({
    stepOne: Yup.object({
      title: Yup.string()
        .matches(ONLY_SPACE_REGEX, i18n.t('common:community_create.input_required'))
        .required(i18n.t('common:common.input_required'))
        .max(60, i18n.t('common:common.validation.char_limit', { char_limit: 60 })),
      content: Yup.string()
        .matches(ONLY_SPACE_REGEX, i18n.t('common:community_create.input_required'))
        .required(i18n.t('common:common.input_required'))
        .max(5000, i18n.t('common:common.validation.char_limit', { char_limit: 5000 })),
    }),
  })
}

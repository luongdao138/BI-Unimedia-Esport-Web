import * as Yup from 'yup'
import i18n from '@locales/i18n'

Yup.setLocale({
  string: {
    max: ({ max }) => i18n.t('common:common.too_long', { max }),
  },
})

export default Yup

import * as Yup from 'yup'
import i18n from '@locales/i18n'

Yup.setLocale({
  string: {
    max: ({ max }) => i18n.t('common:common.too_long', { max }),
    range: ({ min, max }) => i18n.t('common:arena.rules_title.battle_royale_errors.min_max_range_invalid', { min, max }),
  },
})

export default Yup

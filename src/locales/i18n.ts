import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonEN from './en/common'
import commonJP from './en/common'
import termsEN from './en/terms'
import privacyEN from './en/privacy'
import commercialEN from './en/commercial'
import termsJP from './jp/terms'
import privacyJP from './jp/privacy'
import commercialJP from './jp/commercial'
import moment from 'moment'
import 'moment/locale/ja'
moment.locale('ja')

export const resources = {
  en: {
    common: commonEN,
    terms: termsEN,
    privacy: privacyEN,
    commercial: commercialEN,
  },
  jp: {
    common: commonJP,
    terms: termsJP,
    privacy: privacyJP,
    commercial: commercialJP,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
      format: function (value, format) {
        if (format === 'participation_type') {
          if (value === true) {
            return 'チーム'
          }
          return 'ユーザー'
        } else if (format === 'isTeam') {
          if (value === true) {
            return 'チーム'
          }
          return 'ユーザー'
        } else if (format === 'トーナメント表') {
          if (value === true) {
            return '対戦表'
          }
          return 'トーナメント表'
        }
        return value
      },
    },
  })

export default i18n

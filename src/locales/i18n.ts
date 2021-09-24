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
        } else if (format === 'arena_rule') {
          switch (value) {
            case 'single': {
              return 'トーナメント'
            }
            case 'battle_royale': {
              return 'バトルロイヤル'
            }
            case 'score_attack': {
              return 'スコアアタック'
            }
            case 'time_attack': {
              return 'タイムアタック'
            }
            case 0: {
              return 'トーナメント'
            }
            case 2: {
              return 'バトルロイヤル'
            }
            case 3: {
              return 'スコアアタック'
            }
            case 4: {
              return 'タイムアタック'
            }
          }
        } else if (format === 'status_rule') {
          switch (value) {
            case 1: {
              return '受付前'
            }
            case 2: {
              return '受付中'
            }
            case 3:
            case 4: {
              return '開催前'
            }
            case 5: {
              return '開催中'
            }
            case 6: {
              return '大会終了'
            }
            default:
              return ''
          }
        } else if (format === 'battle_royale_rule') {
          switch (value) {
            case 'score_attack': {
              return 'スコア'
            }
            case 'time_attack': {
              return 'タイム'
            }
            case '': {
              return '順位'
            }
            default:
              return ''
          }
        }
        return value
      },
    },
  })

export default i18n

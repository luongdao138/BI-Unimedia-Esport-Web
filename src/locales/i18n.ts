import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonEN from './en/common'
import commonJP from './en/common'

export const resources = {
  en: {
    common: commonEN,
  },
  jp: {
    common: commonJP,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n

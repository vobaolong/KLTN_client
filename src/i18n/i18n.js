import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_VI from '.././locales/vi.json'
import HOME_EN from '.././locales/en.json'
export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

const resources = {
  en: { home: HOME_EN },
  vi: { home: HOME_VI }
}
const defaultNS = 'home'

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: 'home',
  defaultNS,
  interpolation: {
    escapeValue: false
  }
})

export default i18n

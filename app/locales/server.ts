import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  ru_IN: () => import('./ru-IN'),
  en_IN: () => import('./en-IN'),
})

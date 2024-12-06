'use client'
import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  ru_IN: () => import('./ru-IN'),
  en_IN: () => import('./en-IN'),
})

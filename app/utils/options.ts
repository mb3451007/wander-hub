import idFromString from './idFromString'

interface OptionWithTranslations {
  englishName: string
  russianName: string
}

type language = 'en' | 'ru'

export const optionsFromTranslated = (language: language) => {
  return (options: OptionWithTranslations[]) =>
    options.map((option) => {
      return {
        value: idFromString(option.englishName),
        label: (() => {
          switch (language) {
            case 'en':
              return option.englishName
            case 'ru':
              return option.russianName
          }
        })(),
      }
    })
}

const nonWord = /\W/g

export default function idFromString(str: string) {
  return str.toLowerCase().replaceAll(nonWord, '-')
}

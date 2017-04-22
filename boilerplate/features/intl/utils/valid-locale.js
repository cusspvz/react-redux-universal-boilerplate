import { locales } from 'src/locales'

export default function validLocale ( locale ) {
  return locales.indexOf( locale ) !== -1
}

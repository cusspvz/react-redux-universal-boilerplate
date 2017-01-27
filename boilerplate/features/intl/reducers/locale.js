import { INTL_INIT } from '../actions/init'
import { INTL_SET_LOCALE } from '../actions/set-locale'
import { defaultLocale } from 'src/locales'

export default function ( state = defaultLocale, { type, payload }) {

  if ( type === INTL_SET_LOCALE || type === INTL_INIT ) {
    return payload.locale || defaultLocale
  }

  return state
}

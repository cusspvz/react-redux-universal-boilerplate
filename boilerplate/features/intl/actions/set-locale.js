import loadLocale from '../utils/load-locale'
import validLocale from '../utils/valid-locale'
import storage from '../storage'
import browserCookies from 'browser-cookies'

export const INTL_SET_LOCALE = '@@rrub/INTL_SET_LOCALE'

export function intlSetLocale ( locale ) {
  return async ( dispatch ) => {
    if ( ! validLocale( locale ) ) {
      return
    }

    const messages = await loadLocale( locale )

    await dispatch({ type: INTL_SET_LOCALE, payload: { locale, messages } })

    // Save tokens on storage
    if ( ! ENV.NODE ) {
      await storage.setItem( 'locale', locale )
      browserCookies.set( 'lc', locale )
    }

  }
}

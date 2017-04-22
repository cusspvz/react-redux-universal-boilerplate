import loadLocale from '../utils/load-locale'
import validLocale from '../utils/valid-locale'
import storage from '../storage'
import { defaultLocale, locales } from 'src/locales'

export const INTL_INIT = '@@rrub/INTL_INIT'

export function intlInit () {
  return async ( dispatch, getState ) => {
    let { locale, messages } = getState().intl

    const oldLocale = locale

    // Try to fetch locale from storage
    if ( ! ENV.NODE ) {
      locale = await storage.getItem( 'locale' )
    }

    // Load default
    if ( ! locale ) {
      locale = oldLocale || defaultLocale
    }

    // Add locale detect
    if ( ! locale && navigator.languages ) {
      for ( let language of navigator.languages ) {
        if ( locales.indexOf( language ) !== -1 ) {
          locale = language
          break
        }

        language = language.split('-')[0]
        if ( locales.indexOf( language ) !== -1 ) {
          locale = language
          break
        }
      }
    }

    if ( locale && ! validLocale( locale ) ) {
      locale = defaultLocale
    }

    // Ensure we have messages before rendering
    if ( locale ) {
      messages = await loadLocale( locale )
    }

    dispatch({ type: INTL_INIT, payload: { locale, messages } })
  }
}

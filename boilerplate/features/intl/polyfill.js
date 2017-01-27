import { locales } from 'src/locales'
import intlLocalesSupported from 'intl-locales-supported'
import IntlPolyfill from 'intl'

const areIntlLocalesSupported = intlLocalesSupported( locales )

const context = typeof window !== 'undefined' && window || global

if ( ! context.Intl || ! areIntlLocalesSupported ) {
  // Android 4.x (or non Intl browsers) complained because we were setting the
  // language before having the intl loaded.
  // If you wish to uncomment this, please fix it first.
  // require.ensure([], ( require ) => {

    if ( ! context.Intl ) {
      context.Intl = IntlPolyfill
    } else if ( ! areIntlLocalesSupported ) {
      context.Intl.NumberFormat = IntlPolyfill.NumberFormat
      context.Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
    }

  // }, 'intl')
}

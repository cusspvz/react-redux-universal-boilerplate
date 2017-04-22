import { addLocaleData } from 'react-intl'

export default async function loadLocale ( name ) {
  const loader = require('src/locales/' + name +'.i18n.js' )

  const locale = await loader()
  addLocaleData( locale.data )
  return locale.messages || {}
}

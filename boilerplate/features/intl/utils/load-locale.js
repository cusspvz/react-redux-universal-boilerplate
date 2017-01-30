import { addLocaleData } from 'react-intl'

export default async function loadLocale ( locale ) {
  const messages = await require('src/locales/' + locale +'.i18n.js' )

  await require( 'promise?global,[hash].ld!intl/locale-data/jsonp/' + locale )
  const localeData = await require( 'promise?global,[hash].rild!react-intl/locale-data/' + locale )
  addLocaleData( localeData )

  return messages.default || messages
}

// export default function loadLocale ( locale ) {
//   return new Promise(( fulfill, reject ) => {
//     switch( locale ) {
//       case 'en':
//         require.ensure([],
//           (require) => {
//             require( 'intl/locale-data/jsonp/en.js' )
//             addLocaleData( require( 'react-intl/locale-data/en' ) )
//             fulfill( require( '../messages/en' ) )
//           },
//           'intl-en'
//         )
//         break
//       case 'pt':
//         require.ensure([],
//           (require) => {
//             require( 'intl/locale-data/jsonp/pt.js' )
//             addLocaleData( require( 'react-intl/locale-data/pt' ) )
//             fulfill( require( '../messages/pt' ) )
//           },
//           'intl-pt'
//         )
//         break
//     }
//   })
// }

import { addLocaleData } from 'react-intl'

export default async function loadLocale ( locale ) {
  return await require('src/locales/' + locale +'.i18n.js' )
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

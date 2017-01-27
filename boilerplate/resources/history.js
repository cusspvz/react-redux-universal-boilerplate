if ( ENV.CORDOVA ) {
  module.exports = require( 'react-router/lib/hashHistory' )
}
if ( ENV.BROWSER ) {
  module.exports = require( 'react-router/lib/browserHistory' )
}

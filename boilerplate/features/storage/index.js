if ( ENV.NODE ) {

  function npf () {
    throw new Error( "Storage on stateless runs" )
  }

  var storage = module.exports = {
    getItem: npf,
    setItem: npf,
    removeItem: npf,
    clear: npf,
    createInstance: () => storage
  }

} else {
  module.exports = require( 'localforage' )
}

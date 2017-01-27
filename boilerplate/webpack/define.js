var Webpack = require( 'webpack' )

module.exports = function ( config, ENV ) {

  var replacements = {}

  for ( var key in ENV ) {
    replacements[ 'ENV.' + key ] =
    replacements[ 'process.env.' + key ] =
      JSON.stringify( ENV[ key ] )
  }

  config.plugin( 'define-env', Webpack.DefinePlugin, [ replacements ])

}

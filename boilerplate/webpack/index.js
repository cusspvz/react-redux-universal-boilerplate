var Webpack = require( 'webpack' )
var Config = require( 'webpack-configurator' )
var path = require( 'path' )

module.exports = function ( ENV ) {
  var config = new Config()

  config.merge({
    name: ENV.NODE_ENV +'-'+ ENV.TARGET,
    output: {
      filename: 'frontend.js',
      chunkFilename: '[chunkhash].js'
    },
    resolve: {
      alias: {
        'src': path.join( __dirname, '../../src/' ),
        'boilerplate': path.join( __dirname, '../' ),
        'webworkify': 'webworkify-webpack'
      },
      root: [ path.join(__dirname, '../../') ],
      modulesDirectories: [ 'node_modules' ],
      extensions: [ '', '.js', '.jsx' ]
    }
  })

  // targets
  if ( ENV.BROWSER ) require( './target.browser' )( config, ENV )
  if ( ENV.CORDOVA ) require( './target.cordova' )( config, ENV )
  if ( ENV.NODE ) require( './target.node' )( config, ENV )

  require( './define' )( config, ENV )
  require( './json' )( config, ENV )
  require( './csv' )( config, ENV )
  require( './babel' )( config, ENV )
  require( './react' )( config, ENV )
  require( './i18n' )( config, ENV )
  require( './styles' )( config, ENV )
  require( './images' )( config, ENV )
  require( './fonts' )( config, ENV )
  require( './sounds' )( config, ENV )
  require( './compression' )( config, ENV )

  // environments
  if ( ENV.PRODUCTION ) require( './environment.production' )( config, ENV )
  if ( ENV.STAGING ) require( './environment.staging' )( config, ENV )
  if ( ENV.DEVELOPMENT ) require( './environment.development' )( config, ENV )

  // Try to include webpack.config if it is on source
  try { require( '../../src/webpack.config' )( config, ENV ) } catch (e) {}

  return config
}

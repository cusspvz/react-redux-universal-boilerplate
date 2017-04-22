var Webpack = require( 'webpack' )
var path = require( 'path' )

const FILE = path.join( __dirname, '../cordova.js' )
const BUILD_PATH = path.join( __dirname, '../../build/cordova' )

const PUBLIC_PATH = undefined

module.exports = function ( config, ENV ) {

  // Setup entry
  config.merge({
    target: 'web',
    entry: [ 'babel-polyfill', FILE ],
    output: {
      path: BUILD_PATH,
      filename: 'index.js',
      // libraryTarget: 'commonjs'
      publicPath: PUBLIC_PATH,
    }
  })

  config.plugin( 'define-global', Webpack.DefinePlugin, [
    {
      'global': 'window'
    }
  ])
}

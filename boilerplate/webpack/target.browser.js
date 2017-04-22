var Webpack = require( 'webpack' )
var path = require( 'path' )

const FILE = path.join( __dirname, '../browser.js' )
const BUILD_PATH = path.join( __dirname, '../../build/browser' )

module.exports = function ( config, ENV ) {

  // Setup entry
  config.merge({
    target: 'web',
    entry: [ 'babel-polyfill', FILE ],
    output: {
      path: BUILD_PATH,
      filename: 'index.js',
      chunkFilename: '[chunkhash].js',
      libraryTarget: 'umd',
      publicPath: ENV.ASSETS_PUBLIC_PATH,
    }
  })

  config.plugin( 'define-global', Webpack.DefinePlugin, [
    {
      'global': 'window',
    }
  ])
}

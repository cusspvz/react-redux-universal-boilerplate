var Webpack = require( 'webpack' )
var path = require( 'path' )
var fs = require( 'fs' )

const FILE = path.join( __dirname, '../node.js' )
const BUILD_PATH = path.join( __dirname, '../../build/node' )

module.exports = function ( config, ENV ) {

  // Setup entry
  config.merge({
    target: 'node',
    devtool: 'source-map',
    entry: [ 'babel-polyfill', FILE ],
    output: {
      path: BUILD_PATH,
      filename: 'index.js',
      libraryTarget: 'commonjs2',
      publicPath: ENV.ASSETS_PUBLIC_PATH,
    }
  })

  // Use modules present on node_modules
  var nodeModules = {};
  fs.readdirSync('node_modules')
    .filter(function ( x ) { return ['.bin'].indexOf( x ) === -1 })
    .forEach(function ( mod ) { nodeModules[mod] = 'commonjs ' + mod })
  // config.merge({ externals: nodeModules })
  config.merge({ externals: fs.readdirSync('node_modules') })
}

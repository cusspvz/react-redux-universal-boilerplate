var Webpack = require( 'webpack' )

module.exports = function ( config, ENV ) {

  // if ( ENV.DEVELOPMENT && ENV.BROWSER ) {
    config.plugin( 'hot-reload', Webpack.HotModuleReplacementPlugin, [])

    // Unshift hot middleware at the beginning
    config.merge(function ( current ) {
      current.entry.unshift( 'webpack-hot-middleware/client?name='+ current.name +'&reload=false' )

      return current
    })
  // }
}

var Webpack = require( 'webpack' )

module.exports = function ( config, ENV ) {

  config.plugin( 'hot-reload', Webpack.HotModuleReplacementPlugin, [])

  // Unshift hot middleware at the beginning
  config.merge(function ( current ) {
    if ( ENV.BROWSER ) {
      current.entry.unshift( 'webpack-hot-middleware/client?name='+ current.name +'&reload=false' )
    }

    if ( ENV.NODE ) {
      current.entry.unshift( 'webpack/hot/poll?1000' )
    }

    return current
  })

  // Decrease build size
  config.merge({ devtool: "eval" })
}

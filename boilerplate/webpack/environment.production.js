var Webpack = require( 'webpack' )

module.exports = function ( config, ENV ) {

  // In case we are working with production environment
  if ( ENV.PRODUCTION ) {
    // Dedupe
    config.plugin( 'dedupe', Webpack.optimize.DedupePlugin, [])

    // Occurrence Order
    config.plugin( 'occurrence-order', Webpack.optimize.OccurrenceOrderPlugin, [])

    // Optimize chunks
    config.plugin( 'min-chunk-size', Webpack.optimize.MinChunkSizePlugin, [{ minChunkSize: 10000 }])

    // Decrease build size
    config.merge({ devtool: "cheap-source-map" })
  }
}

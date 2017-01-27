var Webpack = require( 'webpack' )

module.exports = function ( config, ENV ) {

  // Compress things on production
  if ( ENV.PRODUCTION || ENV.STAGING ) {

    config.plugin( 'compress', Webpack.optimize.UglifyJsPlugin, [
      {
        sourceMap: false,
        mangle: true,
        comments: false,
        compress: {
          unsafe: false, // defaults: false
          warnings: false, // defaults: true
          sequences: true,
          properties: true,
          dead_code: true,
          conditionals: true,
          comparisons: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          hoist_vars: false, // defaults: false
          if_return: true,
          join_vars: true,
          cascade: true,
          negate_iife: true,
          drop_debugger: true,
          drop_console: true
        }
      }
    ])

  }
}

module.exports = function ( config, ENV ) {

  config.loader( 'fonts', {
    test: /\.(otf|ttf|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file?name=fnt/[hash].[ext]'
  })

  // User null loader in case we are working with the node
  if ( ENV.NODE ) {
    config.removeLoader( 'fonts' )

    config.loader( 'fonts', {
      test: /\.(otf|ttf|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'null'
    })
  }
}

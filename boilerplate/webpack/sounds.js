module.exports = function ( config, ENV ) {

  config.loader( 'sounds', {
    test: /\.(wav|ogg|mp3)$/,
    loader: 'file?name=snd/[hash].[ext]'
  })

  // User null loader in case we are working with the node
  if ( ENV.NODE ) {
    config.removeLoader( 'sounds' )

    config.loader( 'sounds', {
      test: /\.(wav|ogg|mp3)$/,
      loader: 'null'
    })
  }
}

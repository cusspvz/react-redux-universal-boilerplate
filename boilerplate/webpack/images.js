module.exports = function ( config, ENV ) {

  config.loader( 'images', {
    test: /\.(png|jpe?g|gif|svg|ico)$/,
    loader: 'file?name=img/[hash].[ext]'
  })

  // User null loader in case we are working with the node
  // if ( ENV.NODE ) {
  //   config.removeLoader( 'images' )
  //
  //   config.loader( 'images', {
  //     test: /\.(png|jpe?g|gif|svg|ico)$/,
  //     loader: 'null'
  //   })
  // }
}

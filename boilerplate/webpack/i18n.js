module.exports = function ( config, ENV ) {

  config.loader( 'i18n', {
    test: /\.i18n\.js$/,
    loader: 'promise?global,[name]!babel'
  })

}

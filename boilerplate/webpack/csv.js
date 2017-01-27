module.exports = function ( config, ENV ) {

  // Load up json files
  config.loader( 'csv', {
    test: /\.csv$/,
    loader: 'dsv'
  })
}

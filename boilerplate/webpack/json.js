module.exports = function ( config, ENV ) {

  // Load up json files
  config.loader( 'json', {
    test: /\.json$/,
    loader: 'json'
  })
}

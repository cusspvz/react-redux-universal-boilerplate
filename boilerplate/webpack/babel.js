module.exports = function ( config, ENV ) {

  // Handle js with Babel
  config.loader( 'babel', {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loaders: [ 'babel' ]
  })

}

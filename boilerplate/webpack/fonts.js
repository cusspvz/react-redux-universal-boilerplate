module.exports = function ( config, ENV ) {

  config.loader( 'fonts', {
    test: /\.(otf|ttf|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
    loader:
      `file?name=fnt/[hash].[ext]&emitFile=${ENV.NODE && 'false' || 'true'}`
  })
}

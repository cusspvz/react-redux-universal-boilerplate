module.exports = function ( config, ENV ) {

  config.loader( 'less', {
    test: /\.less$/,
    loader: __dirname + '/loaders/style/useable!css!less'
  })

  config.loader( 'css', {
    test: /\.css$/,
    loader: __dirname + '/loaders/style/useable!css'
  })
}

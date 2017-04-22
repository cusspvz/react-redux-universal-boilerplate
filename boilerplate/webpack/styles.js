module.exports = function ( config, ENV ) {

  config.loader( 'less', {
    test: /\.less$/,
    loader: 'style/useable!css!less'
  })

  config.loader( 'css', {
    test: /\.css$/,
    loader: 'style/useable!css'
  })

}

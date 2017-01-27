var Webpack = require( 'webpack' )

module.exports = function ( config, ENV ) {

  config.plugin( 'provider', Webpack.ProvidePlugin, [{
    //'jQuery': 'jquery'
  }])

}

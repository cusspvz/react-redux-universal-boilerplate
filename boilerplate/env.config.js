var path = require('path')

var config = require('../src/config')


module.exports = function setup ( env, target ) {
  var ENV = {}

  ENV.NODE_ENV = env || process.env.NODE_ENV
  ENV.TARGET = target || process.env.TARGET

  // ENV
  ENV.PRODUCTION = ENV.NODE_ENV === 'production'
  ENV.STAGING = ENV.NODE_ENV === 'staging'
  ENV.DEVELOPMENT = ENV.NODE_ENV === 'development'

  if ( ! ENV.PRODUCTION && ! ENV.STAGING && ! ENV.DEVELOPMENT ) {
    throw new Error( "You must define a valid NODE_ENV" )
  }

  // TARGET
  ENV.CORDOVA = ENV.TARGET === 'cordova'
  ENV.BROWSER = ENV.TARGET === 'browser'
  ENV.NODE = ENV.TARGET === 'node'

  if ( ! ENV.CORDOVA && ! ENV.BROWSER && ! ENV.NODE ) {
    throw new Error( "You must define a valid TARGET" )
  }

  // VERSION
  var pkg = require('../package')
  ENV.VERSION = pkg.version

  // Others
  ENV.DOMAIN =
    ENV.PRODUCTION && config.production && config.production.domain ||
    ENV.STAGING && config.staging && config.staging.domain ||
    ENV.DEVELOPMENT && config.development && config.development.domain ||
    'example.com'

  ENV.ANDROID_APP =
    ENV.PRODUCTION && config.production && config.production.androidApp ||
    ENV.STAGING && config.staging && config.staging.androidApp ||
    ENV.DEVELOPMENT && config.development && config.development.androidApp ||
    ENV.DOMAIN

  ENV.IOS_APP =
    ENV.PRODUCTION && config.production && config.production.iosApp ||
    ENV.STAGING && config.staging && config.staging.iosApp ||
    ENV.DEVELOPMENT && config.development && config.development.iosApp ||
    ENV.DOMAIN

  ENV.ASSETS_SERVE_FROM_PATH = './build/browser'
  ENV.ASSETS_SERVE_ON_PATH =
    ENV.PRODUCTION && config.production && config.production.serveBrowserAssetsOver ||
    ENV.STAGING && config.staging && config.staging.serveBrowserAssetsOver ||
    ENV.DEVELOPMENT && config.development && config.development.serveBrowserAssetsOver ||
    '/assets/'

  ENV.ASSETS_PUBLIC_PATH =
    ENV.PRODUCTION && config.production && config.production.publicBrowserAssetsPath ||
    ENV.STAGING && config.staging && config.staging.publicBrowserAssetsPath ||
    ENV.DEVELOPMENT && config.development && config.development.publicBrowserAssetsPath ||
    '/build/'

  ENV.BACKEND_ENDPOINT =
    ENV.PRODUCTION && config.production && config.production.backendEndpoint ||
    ENV.STAGING && config.staging && config.staging.backendEndpoint ||
    ENV.DEVELOPMENT && config.development && config.development.backendEndpoint ||
    '/'

  ENV.HOSTNAME =
    ENV.PRODUCTION && 'www.' + ENV.DOMAIN ||
    ENV.STAGING && 'staging.' + ENV.DOMAIN ||
    ENV.DEVELOPMENT && 'development.' + ENV.DOMAIN

  const custom = config[ENV.NODE_ENV]
  if ( typeof custom == 'object' ) {
    for ( let key in custom ) {
      let value = custom[key]
      ENV[key] = value
    }
  }

  return ENV
}

import Express from 'express'
import React from 'react'
import Helmet from 'react-helmet'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import configureStore from 'boilerplate/resources/configure-store'
import StyledProvider from 'boilerplate/features/styled/provider'
import match from 'react-router/lib/match'
import RouterContext from 'react-router/lib/RouterContext'
import Provider from 'boilerplate/resources/provider'
import isArray from 'is-array'
import compression from 'compression'
import configureRoutes from 'src/routes'
import morgan from 'morgan'
import helmet from 'helmet'

const server = Express()
export default server

// Add morgan and helmet
server.use( morgan('combined') )
server.use( helmet() )

// Serve compressed assets :)
server.use( ENV.ASSETS_SERVE_ON_PATH,
  compression({ level: 9 }),
  Express.static(ENV.ASSETS_SERVE_FROM_PATH, { maxAge: ENV.DEVELOPMENT ? 0 : 60 * 60 * 24 * 4 })
)

if ( ENV.DEVELOPMENT ) {
  const HTTPProxy = require( 'http-proxy' )
  const proxy = HTTPProxy.createProxyServer({ target: 'http://localhost:3001' })
  server.all( '/__webpack_hmr', ( req, res ) => {
    proxy.web( req, res )
  })
}

// Handle store on req
server.use(( req, res, next ) => {
  req.store = configureStore({})
  next()
})

// Parse cookies (needed for lang detection)
import cookieParser from 'cookie-parser'
server.use( cookieParser() )

// Handle intl
import intlParser from 'boilerplate/features/intl/middlewares/parser'
import intlStoreSet from 'boilerplate/features/intl/middlewares/store-set'
server.use( intlParser )
server.use( intlStoreSet )

/* SSL strict */
// I've choosed to send it only on the root path because I don't want to bottleneck
// other paths with an unnecessary header
// Check: https://news.netcraft.com/archives/2016/03/17/95-of-https-servers-vulnerable-to-trivial-mitm-attacks.html
server.get('/', ( req, res, next ) => {
  res.header('Strict-Transport-Security', 'max-age=31536000;')
  next()
})

server.get( '/*',
  // compression({ level: 6 }),

  // Route handling
  ( req, res, next ) => {
    const { store } = req
    req.routes = configureRoutes( store )

    match(
      { routes: req.routes, location: req.url },
      async ( err, redirectLocation, routerProps ) => {
        if ( err ) {
          return next( err )
        }

        if ( redirectLocation ) {
          return res.redirect( 302, redirectLocation.pathname + redirectLocation.search )
        }

        if ( ! routerProps ) {
          return next( new Error("Please add a catch-all 404 route on 'src/router.jsx'") )
        }

        req.routerProps = routerProps

        const { components, location, params, history, routes } = routerProps

        // Transverse all components to check if they have pre-render methods
        if ( components ) {
          for ( let component of components ) {
            let Component = (component && component.WrappedComponent || component)

            // In case they have
            if ( Component && Component.prototype.serverWillRender ) {

              // Instanciate first to simulate a render environment
              let instance = new Component({
                routes, location, params, history,
                state: store.getState(),
                dispatch: store.dispatch,
              })

              // wait for the loading
              await instance.serverWillRender()
            }
          }
        }

        // On this point, we should already have all the info we need
        next()
      }
    )
  },
  ( req, res, next ) => {
    const { store } = req

    // Prepare document vDOM
    const html = renderToString(
      <Provider store={store}>
        <RouterContext {...req.routerProps}>
          { req.routes }
        </RouterContext>
      </Provider>
    )

    // rewind things
    const helmet = Helmet.rewind()
    const cssStyle = StyledProvider.rewind()

    const string = renderToStaticMarkup(
      <html {...helmet.htmlAttributes.toComponent()}>
        <head>
          {helmet.title.toComponent()}

          {/* Links for letting android know link should be accessed on the app */}
          <link rel="alternate" href={`android-app://${ENV.ANDROID_APP}/http/${ENV.DOMAIN}`} />
          <link rel="alternate" href={`android-app://${ENV.ANDROID_APP}/http/www.${ENV.DOMAIN}`} />
          <link rel="alternate" href={`android-app://${ENV.ANDROID_APP}/https/${ENV.DOMAIN}`} />
          <link rel="alternate" href={`android-app://${ENV.ANDROID_APP}/https/www.${ENV.DOMAIN}`} />

          {helmet.meta.toComponent()}
          <meta name="HandheldFriendly" content="True" />
          <meta name="MobileOptimized" content="320" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="shortcut icon" href={`${ENV.ASSETS_PUBLIC_PATH}favicon.ico`} />
          {helmet.link.toComponent()}
          <style id="preloaded" type="text/css" dangerouslySetInnerHTML={{ __html: cssStyle }} />
        </head>
        <body {...helmet.bodyAttributes.toComponent()}>
          <div id="rt" dangerouslySetInnerHTML={{ __html: html }} />
          {helmet.script.toComponent()}
          <script dangerouslySetInnerHTML={{ __html: 'window.__STATE__='+JSON.stringify( store.getState() )}} />
          <script src={`${ENV.ASSETS_PUBLIC_PATH}index.js?v=${ENV.VERSION}`}></script>
        </body>
      </html>
    )

    // pipe stream to response
    res.send( string )
  }
)

/* Error rendering */
server.use(( error, req, res, next ) => {
  // pipe stream to response
  res.send( `<html><head><title>Error</title></head><body><pre>${error && error.stack || error}</pre></body></html>` )
})

// Create Servers
import http from 'http'
const httpServer = http.createServer( server )
httpServer.listen( 3000, () => console.log( "[node-server]: Listening at ::3000" ) )

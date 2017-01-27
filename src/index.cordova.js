import 'file-loader?name=index.html!./index.cordova.html'
import './debug.js'

import FastClick from 'fastclick'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import Provider from 'boilerplate/resources/provider'
import configureStore from 'boilerplate/resources/configure-store'
import history from 'boilerplate/resources/history'
import { syncHistoryWithStore, push } from 'react-router-redux'
import Routes from './routes'

// Create Redux store with initial state
import { init } from './actions'


// dispatch initial auth before rendering


// Cordova init
document.addEventListener( "deviceready", onDeviceReady, false )

async function onDeviceReady () {
  FastClick.attach(document.body)

  history.push( '/' )

  const store = configureStore({})
  const routes = Routes( store, {
    history: syncHistoryWithStore( history, store )
  })

  // Polyfill things
  // iOS
  if ( device.platform === "iOS" ) {
    // Register iOS RTC
    try {
      cordova.plugins.iosrtc.registerGlobals()
    } catch(e) {}
  }

  await store.dispatch( init( store ) )

  render(
    <Provider store={store}>
      { routes }
    </Provider>,
    document.getElementById( 'rt' )
  )

  try {
    navigator.splashscreen.hide();
  } catch(e) {}
}

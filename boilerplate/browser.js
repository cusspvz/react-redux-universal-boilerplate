import React from 'react'
import { render } from 'react-dom'
import configureRoutes from 'src/routes'
import Provider from 'boilerplate/resources/provider'
import configureStore from 'boilerplate/resources/configure-store'
import history from 'boilerplate/resources/history'
import { syncHistoryWithStore } from 'react-router-redux'

// Grab the state from a global injected into server-generated HTML
const state = window.__STATE__
delete window.__STATE__

// Create Redux store with initial state
export const store = configureStore( state )
export const routes = configureRoutes( store, {
  history: syncHistoryWithStore( history, store )
})

// dispatch initial auth before rendering
import { init } from 'src/actions'
const storeReady = store.dispatch( init( store ) )

storeReady.then(() => {
  render(
    <Provider store={store}>
      { routes }
    </Provider>,
    document.getElementById( 'rt' )
  )

  // Delete preloaded style node
  const preloadedStyle = document.getElementById('preloaded')
  if ( preloadedStyle ) {
    preloadedStyle.remove()
  }

})

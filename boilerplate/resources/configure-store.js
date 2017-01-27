import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import history from 'boilerplate/resources/history'

import thunk from 'redux-thunk'
import rootReducer from 'src/reducers'

export default ( initialState ) => {
  const hasDevTools = ! ENV.NODE && 'devToolsExtension' in window

  let enhancers = []

  // Allow async actions
  enhancers.push( applyMiddleware( thunk ) )

  // Let react-router dispatch actions through react-router-redux
  if ( ! ENV.NODE ) {
    enhancers.push( applyMiddleware( routerMiddleware( history ) ) )
  }

  // Allow chrome store redux dev tools access
  if ( ENV.DEVELOPMENT && hasDevTools ) {
    enhancers.push( window.devToolsExtension() )
  }

  // Create store
  const store = createStore(
    rootReducer,
    initialState,
    enhancers.length ? compose.apply( undefined, enhancers ) : f => f
  )

  // if ( ENV.BROWSER && ENV.DEVELOPMENT && hasDevTools ) {
  //   // Required for replaying actions from devtools to work
  //   reduxRouterMiddleware.listenForReplays( store )
  // }

  if ( module.hot ) {
    module.hot.accept('src/reducers', () => {
      const nextReducer = require( 'src/reducers' )
      store.replaceReducer( nextReducer )
    })
  }

  return store
}

import React from 'react'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRedirect from 'react-router/lib/IndexRedirect'
import Redirect from 'react-router/lib/Redirect'

import App from './containers/App/App'
import HomePage from './pages/Home/HomePage'
import Error404Page from './pages/Error404/Error404Page'

export default ( store, routerProps ) => (
  <Router {...routerProps} onUpdate={onURLChange}>
    <Route component={App} path='/'>
      <IndexRedirect to='/home' />

      <Route path='/home' component={HomePage} />

      <Route path='*' component={Error404Page} />
    </Route>
  </Router>
)

// Hooks
function onURLChange () {

}

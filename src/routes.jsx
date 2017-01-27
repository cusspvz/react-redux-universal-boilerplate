import React from 'react'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRedirect from 'react-router/lib/IndexRedirect'
import Redirect from 'react-router/lib/Redirect'

import App from './containers/app'
import HomePage from './pages/Home'

export default ( store, routerProps ) => (
  <Router {...routerProps}>
    <Route component={App} path="/">
      <IndexRedirect to="/home" />

      <Route path="/home" component={HomePage} />
    </Route>
  </Router>
)

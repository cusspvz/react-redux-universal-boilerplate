import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import IntlProvider from 'boilerplate/features/intl/provider'

export default ({ store, children }) => (
  <ReduxProvider store={store}>
    <IntlProvider>
      {children}
    </IntlProvider>
  </ReduxProvider>
)

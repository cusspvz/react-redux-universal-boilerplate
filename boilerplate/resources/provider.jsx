import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import IntlProvider from 'boilerplate/features/intl/provider'
import SrcProvider from 'src/provider'

export default (props) => (
  <ReduxProvider store={props.store}>
    <IntlProvider>
      <SrcProvider {...props}>
        {props.children}
      </SrcProvider>
    </IntlProvider>
  </ReduxProvider>
)

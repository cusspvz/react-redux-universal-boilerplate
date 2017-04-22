import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import loadLocale from './utils/load-locale'

import './polyfill'

@connect( state => state.intl )
export default class ConnectedIntlProvider extends Component {

  shouldComponentUpdate = ({ locale, messages }) => (
    this.props.locale !== locale || this.props.messages !== messages
  )

  render () {
    const { locale, messages, children } = this.props

    return (
      <IntlProvider {...{
        locale,
        messages
      }}>
        {children}
      </IntlProvider>
    )
  }
}

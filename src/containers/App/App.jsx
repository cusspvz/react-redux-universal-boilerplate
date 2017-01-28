import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import styled from 'boilerplate/features/styled'
import style from './App.less'
import semanticStyle from 'semantic-ui-css/semantic.css'

@styled( style )
@styled( semanticStyle )
export default class App extends Component {

  render () {
    const { children } = this.props

    return (
      <div className={style.locals.root}>
        {children}
      </div>
    )
  }
}

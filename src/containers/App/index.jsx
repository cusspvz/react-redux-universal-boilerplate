import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import styled from 'boilerplate/features/styled'
import style from './index.less'

@styled( style )
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

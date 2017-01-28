import React, { Component } from 'react'
import { Segment, Container, Message } from 'semantic-ui-react'

import Header from 'src/components/Header/HeaderComponent'
import Footer from 'src/components/Footer/FooterComponent'

import styled from 'boilerplate/features/styled'
import style from './Error404Page.less'

@styled( style )
export default class HomePage extends Component {

  state = {
    welcomeMessage: true
  }

  render () {
    const { welcomeMessage } = this.state

    return (
      <div className={style.locals.root}>
        <Segment vertical inverted textAlign='center' className="jumbotron">
          <Header />

          <div className="ui text container">
            <h1 className="ui inverted header">
              Ooops! Looking up on the Limbo!?
            </h1>
            <h2>Sorry, but the requested page was not found!</h2>
            <div className="ui huge primary button">
              Go home, you're drunk <i className="right arrow icon"></i>
            </div>
          </div>

        </Segment>
      </div>
    )
  }

  handleDismiss = () => {
    this.setState({ welcomeMessage: false })
  }
}

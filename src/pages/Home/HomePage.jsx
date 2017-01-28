import React, { Component } from 'react'
import { Segment, Container, Message } from 'semantic-ui-react'

import Header from 'src/components/Header/HeaderComponent'
import Footer from 'src/components/Footer/FooterComponent'

import styled from 'boilerplate/features/styled'
import style from './HomePage.less'

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

          {welcomeMessage && <Message
            onDismiss={this.handleDismiss}
            header='Welcome back!'
            content='Please try to edit this text while on dev mode'
          />}
        </Segment>

        <Segment vertical>
          <Container>

            Yes, you got it!
            This boilerplate includes HMR.

            Please navigate trought the menu to check for other features.
          </Container>
        </Segment>


        <Footer />
      </div>
    )
  }

  handleDismiss = () => {
    this.setState({ welcomeMessage: false })
  }
}

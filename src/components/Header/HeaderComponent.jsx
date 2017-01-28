import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import { Container, Menu } from 'semantic-ui-react'

import styled from 'boilerplate/features/styled'
import style from './HeaderComponent.less'

@styled( style )
export default class HeaderComponent extends Component {
  render () {
    return (
      <Container className={style.locals.root}>

        <Menu inverted pointing secondary>
          <Menu.Item as={Link} to='/home' name='home' active />
          <Menu.Item as={Link} to='/messages' name='messages' />
          <Menu.Item as={Link} to='/friends' name='friends' />
        </Menu>

      </Container>
    )
  }
}

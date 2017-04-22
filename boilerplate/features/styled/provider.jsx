import React, { Component, Children, PropTypes } from 'react'
import withSideEffect from 'react-side-effect'

class StyledProvider extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
    children: PropTypes.any
  }

  render() {
    const { children } = this.props

    return children && Children.only(children) || null
  }
}

function reducePropsToState(propsList) {
  const styles = []

  for ( let props of propsList ) {
    if ( props.style && props.style.content && styles.indexOf( props.style.content ) === -1 ) {
      styles.push( props.style.content )
    }
  }

  return styles.join('\n')
}

function handleStateChangeOnClient(style) {
  // Object.assign(document.body.style, style)
}

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(StyledProvider)

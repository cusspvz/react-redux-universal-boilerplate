import React from 'react'

export default (style) => {

  if(style == null) {
    return (StyledComponent) => {
      throw new TypeError(
        `rrub/features/styled: missing \`style\` static property. ` +
        `check ${ StyledComponent.name }`
      )
    }
  }

  return (StyledComponent) => {
    const proto = StyledComponent.prototype

    const componentDidMount = proto.componentDidMount
    const componentDidUpdate = proto.componentDidUpdate
    const componentWillUnmount = proto.componentWillUnmount

    proto.componentDidMount = function () {
      style.use()
      if(componentDidMount) {
        componentDidMount.call(this)
      }
    }

    proto.componentDidUpdate = function () {
      try{ style.use() } catch (e) { /* yolo */ }
      if(componentDidUpdate) {
        componentDidUpdate.call(this)
      }
    }

    proto.componentWillUnmount = function () {
      try{ style.unuse() } catch (e) { /* yolo */ }
      if(componentWillUnmount) {
        componentWillUnmount.call(this)
      }
    }

    if ( ENV.NODE ) {
      const render = proto.render
      const StyledProvider = require('./provider').default
      proto.render = function () {
        return <StyledProvider style={style} children={render.apply(this,arguments)}/>
      }
    }

    return StyledComponent
  }

}

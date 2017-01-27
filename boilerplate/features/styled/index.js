export default (styles) => {

  if(styles == null) {
    return (StyledComponent) => {
      throw new TypeError(
        `rrub/features/styled: missing \`styles\` static property. ` +
        `check ${ StyledComponent.name }`
      )
    }
  }

  return (StyledComponent) => {
    const proto = StyledComponent.prototype

    const componentDidMount = proto.componentDidMount
    const componentWillUnmount = proto.componentWillUnmount

    Object.assign( proto, {
      componentDidMount () {
        styles.use()
        if(componentDidMount) {
          componentDidMount.call(this)
        }
      },

      componentWillUnmount () {
        styles.unuse()
        if(componentWillUnmount) {
          componentWillUnmount.call(this)
        }
      },
    })

    return StyledComponent
  }

}

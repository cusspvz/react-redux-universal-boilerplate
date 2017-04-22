export default ( page ) => {
  // const loader = require( 'promise?global,[name]!src/pages/' + page )

  return async ( nextState, callback ) => {
    console.log( module )

    // const module = await loader()
    // console.log( module )
    callback(null, () => 'lol')
    // callback(null, module.default || module)
  }
}

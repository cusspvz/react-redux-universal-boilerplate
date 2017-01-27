import { formatMessage } from 'react-intl'

export default function IntlError ( descriptor, values = {} ) {
  const { id, defaultMessage } = descriptor

  if ( ! id ) {
    throw new Error( "invalid message object" )
  }

  this.name = this.constructor.name
  // this.constructor = IntlError
  this.message = defaultMessage
  this.descriptor = descriptor
  this.values = values

  if ( typeof Error.captureStackTrace == 'function' ) {
    Error.captureStackTrace(this, this.constructor)
  } else {
    this.stack = (new Error(message)).stack
  }
}

IntlError.prototype = Object.create( Error.prototype )

IntlError.prototype.formatMessage = function ( intl ) {
  const { descriptor, values } = this
  return intl.formatMessage( descriptor, values )
}

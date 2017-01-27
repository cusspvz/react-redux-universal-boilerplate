import { INTL_INIT } from '../actions/init'
import { INTL_SET_LOCALE } from '../actions/set-locale'

export default function ( state = {}, { type, payload }) {

  if ( type === INTL_SET_LOCALE || type === INTL_INIT ) {
    return payload.messages
  }

  return state
}

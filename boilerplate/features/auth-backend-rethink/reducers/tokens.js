import { AUTH_INIT, AUTH_REGISTER_SUCCESS, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from '../actions'

const DEFAULT_STATE = null

export default ( state = DEFAULT_STATE, { type, payload }) => {

  if ( type === AUTH_INIT || type === AUTH_REGISTER_SUCCESS || type === AUTH_LOGIN_SUCCESS ) {
    return payload.tokens || DEFAULT_STATE
  }

  if ( type === AUTH_LOGOUT ) {
    return DEFAULT_STATE
  }

  return state
}

import { AUTH_USER_REFRESH_SUCCESS, AUTH_LOGOUT } from '../actions'

const DEFAULT_STATE = null

export default ( state = DEFAULT_STATE, { type, payload }) => {

  if ( type === AUTH_USER_REFRESH_SUCCESS ) {
    return payload.user || DEFAULT_STATE
  }

  if ( type === AUTH_LOGOUT ) {
    return DEFAULT_STATE
  }

  return state
}

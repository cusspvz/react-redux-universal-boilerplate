// Please make sure you got a backendEndpoint on your config
const ENDPOINT = ENV.BACKEND_ENDPOINT

export const AUTH_INIT = '@rrub/AUTH/INIT'
export const AUTH_LOGIN = '@rrub/AUTH/LOGIN'
export const AUTH_LOGOUT = '@rrub/AUTH/LOGOUT'
export const AUTH_LOGIN_FAILED = '@rrub/AUTH/LOGIN/FAILED'
export const AUTH_LOGIN_SUCCESS = '@rrub/AUTH/LOGIN/SUCCESS'
export const AUTH_REGISTER = '@rrub/AUTH/REGISTER'
export const AUTH_REGISTER_FAILED = '@rrub/AUTH/REGISTER/FAILED'
export const AUTH_REGISTER_SUCCESS = '@rrub/AUTH/REGISTER/SUCCESS'
export const AUTH_USER_REFRESH = '@rrub/AUTH/USER_REFRESH'
export const AUTH_USER_REFRESH_SUCCESS = '@rrub/AUTH/USER_REFRESH/SUCCESS'

import storage from './storage'

export function authInit () {
  return async ( dispatch ) => {
    const user_id = await storage.getItem( 'user_id' )
    const tokens = await storage.getItem( 'tokens' )

    if ( user_id && tokens ) {
      await dispatch({ type: AUTH_INIT, payload: { user_id, tokens } })
      await dispatch( authRefreshUser() )
    }
  }
}

export function authLogin ({ email, password }) {

  if ( ! email ) {
    throw new Error('No email')
  }

  if ( ! password ) {
    throw new Error('No password')
  }

  return async ( dispatch, getState ) => {
    const { auth: { logged } } = getState()

    if ( logged ) {
      return
    }

    await dispatch({ type: AUTH_LOGIN, payload: { email, password } })

    try {
      const response = await fetch( `${ENDPOINT}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if ( ! response.ok ) {
        throw new Error('Bad password')
      }

      // decode json from response
      let { user_id, client_id, tokens } = await response.json()

      // save into storage
      await storage.setItem('user_id', user_id)
      await storage.setItem('tokens', tokens)
      await storage.setItem('client_id', client_id)

      await dispatch({ type: AUTH_LOGIN_SUCCESS, payload: { user_id, email, tokens } })
    } catch ( err ) {
      await dispatch({ type: AUTH_LOGIN_FAILED, payload: { err, email } })
      throw err
    }

    await dispatch( authRefreshUser() )
  }
}

export function authRegister ({ email, password, name }) {

  if ( ! email ) {
    throw new Error('No email')
  }

  if ( ! password ) {
    throw new Error('No password')
  }

  return async ( dispatch, getState ) => {
    const { auth: { logged } } = getState()

    if ( logged ) {
      return
    }

    await dispatch({ type: AUTH_REGISTER, payload: { email, password, name } })

    try {
      const oldClientId = await storage.getItem('client_id')
      const response = await fetch( `${ENDPOINT}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name, client_id: oldClientId })
      })

      if ( ! response.ok ) {
        throw new Error('Email already exists')
      }

      // decode json from response
      let { user_id, client_id, tokens } = await response.json()

      // save into storage
      await storage.setItem('user_id', user_id)
      await storage.setItem('tokens', tokens)
      await storage.setItem('client_id', client_id)

      await dispatch({ type: AUTH_REGISTER_SUCCESS, payload: { user_id, email, tokens } })
    } catch ( err ) {
      await dispatch({ type: AUTH_REGISTER_FAILED, payload: { err, email } })
      throw err
    }

    await dispatch( authRefreshUser() )
  }
}

export function authRefreshUser () {
  return async ( dispatch, getState ) => {
    const { auth: { logged, tokens } } = getState()

    if ( ! logged ) {
      return
    }

    // logged is the user id
    const response = await fetch( `${ENDPOINT}/users/${logged}`, {
      headers: {
        'Authorization': `JWT ${tokens.access}`
      }
    })
    const user = await response.json()

    await dispatch({ type: AUTH_USER_REFRESH_SUCCESS, payload: { user } })
  }
}

export function authLogout () {
  return async ( dispatch, getState ) => {
    const { auth: { logged } } = getState()

    if ( ! logged ) {
      return
    }

    await dispatch({ type: AUTH_LOGOUT, payload: {} })
    await storage.removeItem('user_id')
    await storage.removeItem('tokens')
  }
}

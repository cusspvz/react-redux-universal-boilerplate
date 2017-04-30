export const RRUB_INIT = '@@rrub/INIT'
export const RRUB_INIT_COMPLETED = '@@rrub/INIT/COMPLETED'

// import { authInit } from 'boilerplate/features/auth-backend-rethink/actions'
import { intlInit } from 'boilerplate/features/intl/actions'

export function init () {
  return async ( dispatch ) => {
    await dispatch({ type: RRUB_INIT })

    await dispatch( intlInit() )
    // await dispatch( authInit() )

    await dispatch({ type: RRUB_INIT_COMPLETED })
  }
}

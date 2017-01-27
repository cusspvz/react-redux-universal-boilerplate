export const RRUB_INIT = '@@rrub/INIT'
export const RRUB_INIT_COMPLETED = '@@rrub/INIT/COMPLETED'

import { intlInit } from '../features/intl/actions/init'

export function init ( store ) {
  return async ( dispatch ) => {
    dispatch({ type: RRUB_INIT })

    await dispatch( intlInit( store ) )

    await dispatch({ type: RRUB_INIT_COMPLETED })
  }
}

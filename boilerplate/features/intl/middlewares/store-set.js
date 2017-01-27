import { intlSetLocale } from '../actions/set-locale'

export default async ( req, res, next ) => {
  const { store, locale } = req
  const { dispatch } = store

  if ( ! locale ) {
    return
  }

  try {
    await dispatch( intlSetLocale( locale ) )
  } catch ( err ) {
    next( err )
  }
  next()
}

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import intl from 'boilerplate/features/intl/reducers'


export default (reducers) => combineReducers({
  ...reducers,
  routing, intl,
})

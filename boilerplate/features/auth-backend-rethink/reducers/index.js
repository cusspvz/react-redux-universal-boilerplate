import { combineReducers } from 'redux'

import logged from './logged'
import tokens from './tokens'
import me from './me'

export default combineReducers({
  logged, tokens, me
})

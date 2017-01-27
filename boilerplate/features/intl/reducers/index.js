import { combineReducers } from 'redux'

import locale from './locale'
import messages from './messages'

export default combineReducers({
  locale, messages
})

import { combineReducers } from 'redux'
import user from './user'
import tweets from './tweets'

export default combineReducers({ tweets, user })

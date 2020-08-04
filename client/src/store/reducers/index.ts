import { combineReducers } from 'redux'
import user from './user'
import tweets, { TweetsState } from './tweets'

export default combineReducers({ tweets, user })

export type RootState = {
  tweets: TweetsState
}

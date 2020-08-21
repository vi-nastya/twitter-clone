import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { TweetData } from '../api/api-types'
import { combineReducers } from 'redux'
import tweetsListReducer from './ducks/tweetsList'
import tweetFormReducer from './ducks/tweetForm'

const rootReducer = combineReducers({
  list: tweetsListReducer,
  form: tweetFormReducer,
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

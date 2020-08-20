import { TweetData } from '../../api/api-types'
import { initialState } from '../state'

export const ADD_TWEET = 'ADD_TWEET'
export const SET_TWEETS = 'SET_TWEETS'
export const DELETE_TWEET = 'DELETE_TWEET'
export const GET_USER = 'GET_USER'

// actions
interface SetTweetsAction {
  type: typeof SET_TWEETS
  payload: TweetData[]
}

interface AddTweetAction {
  type: typeof ADD_TWEET
  payload: TweetData
}

interface DeleteTweetAction {
  type: typeof DELETE_TWEET
  payload: string
}

type TweetsListActionType = SetTweetsAction | AddTweetAction | DeleteTweetAction

// action creators
export const setTweets = (tweetsData: TweetData[]): SetTweetsAction => ({
  type: SET_TWEETS,
  payload: tweetsData,
})

export const addTweet = (tweetData: TweetData): AddTweetAction => ({
  type: ADD_TWEET,
  payload: tweetData,
})

export const deleteTweet = (tweetId: string): DeleteTweetAction => ({
  type: DELETE_TWEET,
  payload: tweetId,
})

export const fetchTweets = () => {
  // @ts-ignore
  return (dispatch) => {
    fetch('http://localhost:9000/api/tweets')
      .then((res) => res.json())
      .then((res) => {
        dispatch(setTweets(res as TweetData[]))
      })
  }
}

export type TweetsState = {
  tweetsList: TweetData[]
}

export default function (
  state: TweetsState = initialState,
  action: TweetsListActionType
) {
  switch (action.type) {
    case ADD_TWEET: {
      const tweetData = action.payload
      return {
        ...state,
        tweetsList: [...state.tweetsList, tweetData],
      }
    }
    case SET_TWEETS: {
      const tweetsData = action.payload
      return {
        ...state,
        tweetsList: tweetsData,
      }
    }
    default:
      return state
  }
}

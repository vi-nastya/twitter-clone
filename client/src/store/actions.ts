import { ADD_TWEET, DELETE_TWEET, SET_TWEETS } from './actionTypes'
import { TweetData } from '../api/api-types'

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

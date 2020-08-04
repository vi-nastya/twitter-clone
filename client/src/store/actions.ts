import { ADD_TWEET, DELETE_TWEET, SET_TWEETS } from './actionTypes'
import { TweetData } from '../api/api-types'

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

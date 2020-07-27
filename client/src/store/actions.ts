import { ADD_TWEET, DELETE_TWEET } from './actionTypes'
import { TweetData } from '../api/api-types'

interface AddTweetAction {
  type: typeof ADD_TWEET
  payload: TweetData
}

interface DeleteTweetAction {
  type: typeof DELETE_TWEET
  payload: string
}

export const addTweet = (tweetData: TweetData): AddTweetAction => ({
  type: ADD_TWEET,
  payload: tweetData,
})

export const deleteTweet = (tweetId: string): DeleteTweetAction => ({
  type: DELETE_TWEET,
  payload: tweetId,
})

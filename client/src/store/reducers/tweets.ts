import { ADD_TWEET, SET_TWEETS } from '../actionTypes'
import { TweetData } from '../../api/api-types'

export type TweetsState = {
  allTweets: TweetData[]
}

const initialState: TweetsState = {
  allTweets: [],
}

// @ts-ignore
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TWEET: {
      const { tweetData } = action.payload
      return {
        ...state,
        allTweets: [...state.allTweets, tweetData],
      }
    }
    case SET_TWEETS: {
      const tweetsData = action.payload
      return {
        ...state,
        allTweets: tweetsData,
      }
    }
    default:
      return state
  }
}

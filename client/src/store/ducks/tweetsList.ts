import { TweetData } from '../../api/api-types'
import { initialListState, TweetsListState } from '../state'
import { api } from '../../api/api'

export const ADD_TWEET = 'ADD_TWEET'
export const UPDATE_TWEET = 'UPDATE_TWEET'
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

interface UpdateTweetAction {
  type: typeof UPDATE_TWEET
  payload: TweetData
}

interface DeleteTweetAction {
  type: typeof DELETE_TWEET
  payload: string
}

type TweetsListActionType =
  | SetTweetsAction
  | AddTweetAction
  | DeleteTweetAction
  | UpdateTweetAction

// action creators
export const setTweets = (tweetsData: TweetData[]): SetTweetsAction => ({
  type: SET_TWEETS,
  payload: tweetsData,
})

export const addTweet = (tweetData: TweetData): AddTweetAction => ({
  type: ADD_TWEET,
  payload: tweetData,
})

export const updateTweet = (tweetData: TweetData): UpdateTweetAction => ({
  type: UPDATE_TWEET,
  payload: tweetData,
})

export const deleteTweet = (tweetId: string): DeleteTweetAction => ({
  type: DELETE_TWEET,
  payload: tweetId,
})

export const fetchTweets = () => {
  // @ts-ignore
  return async (dispatch) => {
    const result = await api.tweetsGet()
    dispatch(setTweets(result as TweetData[]))
  }
}

export default function (
  state: TweetsListState = initialListState,
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
    case UPDATE_TWEET: {
      const tweetData = action.payload
      const newTweets = [...state.tweetsList]
      newTweets.map((t) => (t.id === tweetData.id ? tweetData : t))
      return {
        ...state,
        tweetsList: [newTweets],
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

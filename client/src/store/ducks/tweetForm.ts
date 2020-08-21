import { initialFormState, TweetFormState } from '../state'

// actions
export const OPEN_CREATE_TWEET_FORM = 'OPEN_CREATE_TWEET_FORM'
export const OPEN_UPDATE_TWEET_FORM = 'OPEN_UPDATE_TWEET_FORM'
export const CLOSE_TWEET_FORM = 'CLOSE_TWEET_FORM'

interface OpenCreateTweetFormAction {
  type: typeof OPEN_CREATE_TWEET_FORM
}

interface OpenUpdateTweetFormAction {
  type: typeof OPEN_UPDATE_TWEET_FORM
  payload: string // tweetId
}

interface CloseTweetFormAction {
  type: typeof CLOSE_TWEET_FORM
}

type TweetFormAction =
  | OpenCreateTweetFormAction
  | OpenUpdateTweetFormAction
  | CloseTweetFormAction

// action creators
export const openCreateTweetForm = (): OpenCreateTweetFormAction => ({
  type: OPEN_CREATE_TWEET_FORM,
})

export const openUpdateTweetForm = (
  tweetId: string
): OpenUpdateTweetFormAction => ({
  type: OPEN_UPDATE_TWEET_FORM,
  payload: tweetId,
})

export const closeTweetForm = (): CloseTweetFormAction => ({
  type: CLOSE_TWEET_FORM,
})

// reducers
export default function (
  state: TweetFormState = initialFormState,
  action: TweetFormAction
) {
  switch (action.type) {
    case OPEN_CREATE_TWEET_FORM: {
      return {
        ...state,
        tweetForm: {
          type: 'create',
        },
      }
    }
    case OPEN_UPDATE_TWEET_FORM: {
      const tweetId = action.payload
      return {
        ...state,
        tweetForm: {
          type: 'update',
          tweetId: tweetId,
        },
      }
    }
    case CLOSE_TWEET_FORM: {
      return {
        ...state,
        tweetForm: null,
      }
    }
    default:
      return state
  }
}

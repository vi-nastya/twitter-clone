import { TweetData } from '../api/api-types'

export type TweetsListState = {
  tweetsList: TweetData[]
}

export const initialListState = {
  tweetsList: [],
}

export type TweetFormState = {
  tweetForm: { type: 'create' } | { type: 'update'; tweetId: string } | null
}

export const initialFormState = {
  tweetForm: null,
}

export type RootState = {
  list: TweetsListState
  form: TweetFormState
}

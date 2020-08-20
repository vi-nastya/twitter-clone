import { TweetData } from '../api/api-types'

export type TweetsState = {
  tweetsList: TweetData[]
  tweetForm: { type: 'create' } | { type: 'update'; tweetId: string } | null
}

export const initialState: TweetsState = {
  tweetsList: [],
  tweetForm: null,
}

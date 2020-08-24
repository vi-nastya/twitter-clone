export type TweetData = {
  userName: string
  userHandle: string
  created: string
  updated: string
  text: string
  likes: number
  id: string
}

export type NewTweetData = {
  userName: string
  userHandle?: string
  text: string
}

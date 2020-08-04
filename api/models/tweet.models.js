module.exports = (mongoose) => {
  const Schema = mongoose.Schema

  let tweetSchema = new Schema(
    {
      userName: String,
      userHandle: String,
      avatar: String,
      published: Date,
      text: String,
      comments: Number,
      shares: Number,
      likes: Number,
    },
    { timestamp: true }
  )

  tweetSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Tweet = mongoose.model('tweet', tweetSchema)
  return Tweet
}

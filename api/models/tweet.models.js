module.exports = (mongoose) => {
  const Schema = mongoose.Schema

  let tweetSchema = new Schema(
    {
      userName: { type: String, required: true },
      userHandle: { type: String, required: false },
      avatar: { type: String, required: false },
      created: { type: Date, required: true },
      updated: { type: Date, required: true },
      text: { type: String, required: true },
      image: { type: String, required: false },
      likes: { type: Number, required: true },
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

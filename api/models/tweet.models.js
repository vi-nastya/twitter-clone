const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
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

const Tweet = mongoose.model('Tweet', tweetSchema)
module.exports = Tweet

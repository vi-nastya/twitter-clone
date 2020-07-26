module.exports = (mongoose) => {
  const Schema = mongoose.Schema;

  let tweetSchema = new Schema(
    {
      title: String,
      description: String,
      published: Boolean,
    },
    { timestamp: true }
  );

  tweetSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tweet = mongoose.model("tweet", tweetSchema);
  return Tweet;
};

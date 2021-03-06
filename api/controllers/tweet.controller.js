const db = require('../models')
const { mongoose } = require('../models')
const Tweet = db.tweets

// create and Save a new one
exports.create = (req, res) => {
  // validate request
  if (!req.body.text) {
    res.status(400).send({ message: 'Content can not be empty' })
    return
  }

  const currentDate = new Date(Date.now()).toISOString()
  // create tweet
  const tweet = new Tweet({
    ...req.body,
    created: currentDate,
    updated: currentDate,
    likes: 0,
  })

  // save to bg
  tweet
    .save(tweet)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || 'Some error occured while creating tweet',
      })
    )
}

// get all tweets from DB
exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: 'i' } }
    : {}

  Tweet.find(condition)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || 'Some error occured while creating tweet',
      })
    )
}

// find a single tweet with id
exports.findOne = (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid tweet id' })
  }

  Tweet.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found Tweet with id ' + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error retrieving Tweet with id=' + id })
    })
}

// update
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    })
  }

  const id = req.params.id

  Tweet.findByIdAndUpdate(
    id,
    {
      $set: {
        text: req.body.text,
        updated: new Date(Date.now()).toISOString(),
      },
    },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tweet with id=${id}. Maybe Tweet was not found!`,
        })
      } else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Tweet with id=' + id,
      })
    })
}

// delete
exports.delete = (req, res) => {
  const id = req.params.id

  Tweet.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tweet with id=${id}. Maybe Tweet was not found!`,
        })
      } else {
        res.send({
          message: 'Tweet was deleted successfully!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Tweet with id=' + id,
      })
    })
}

// update
exports.addLike = (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid tweet id' })
  }

  Tweet.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot add like for Tweet with id=${id}. Maybe Tweet was not found!`,
        })
      } else res.send({ likes: data.likes + 1 })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error adding like for Tweet with id=' + id,
      })
    })
}

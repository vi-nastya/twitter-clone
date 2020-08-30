const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https')
const createError = require('http-error')
const fs = require('fs')

const corsOptions = {
  origin: 'http://localhost:3000',
}

const app = express()
app.use(cors(corsOptions))

// parse requests of content-type application/json
app.use(express.json())
// parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require('./models')
db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the DB')
  })
  .catch((err) => {
    console.log('Cannot connect to DB', err)
    process.exit()
  })

const tweetsRouter = require('./routes/tweet.routes')
app.use('/api/tweets', tweetsRouter)

app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err)
})

module.exports = app

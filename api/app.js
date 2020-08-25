const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https')
const fs = require('fs')

const key = fs.readFileSync(__dirname + '/certs/selfsigned.key')
const cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt')

const corsOptions = {
  origin: 'http://localhost:3000',
}

const app = express()
app.use(cors(corsOptions))

// parse requests of content-type application/json
app.use(bodyParser.json())
// parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

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

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the twitter clone app' })
})

require('./routes/tweet.routes')(app)

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

// set port, listen for requests
const port = process.env.PORT || 9000
const server = https.createServer({ key, cert }, app)

server.listen(port, () => {
  console.log('server starting on port : ' + port)
})

const { exec } = require('child_process')
const { json } = require('body-parser')

const { tweets } = require('./initial-data')

// clear database
const MongoClient = require('mongodb').MongoClient

const clearDb = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017/', function (err, db) {
      if (err) throw err
      var dbo = db.db('tweets_db')
      dbo.collection('tweets').drop(function (err, delOK) {
        if (err) throw err
        if (delOK) {
          console.log('Collection deleted')
          resolve('deleted')
        }
        db.close()
      })
    })
  })
}

const runCurl = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error)
      }
      resolve(stdout ? stdout : stderr)
    })
  })
}

const postTweet = (tweet) => {
  return `
    curl 'http://localhost:9000/api/tweets' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-binary '${JSON.stringify(tweet)}' \
    `
}

const likeTweet = (tweetId) => {
  return `
    curl 'http://localhost:9000/api/tweets/${tweetId}/like' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-binary '{}' \
    `
}

const main = async () => {
  await clearDb()

  for (const tweet of tweets) {
    const tweetCmd = postTweet(tweet.tweetData)
    try {
      const res = await runCurl(tweetCmd)

      const tweetId = JSON.parse(res).id

      // like it
      for (let i = 0; i < tweet.likes; i++) {
        await runCurl(likeTweet(tweetId))
      }
    } catch (err) {
      console.error('Something went wrong:', err)
    }
  }
}

main()

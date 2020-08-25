const { exec } = require('child_process')
const { json } = require('body-parser')

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

const tweets = [
  {
    tweetData: {
      userName: 'Anastasia',
      text: 'Meow 😻',
    },
    likes: 10,
  },
  {
    tweetData: {
      userName: 'Anastasia',
      text: 'RRRR!!!',
    },
    likes: 2,
  },
  {
    tweetData: {
      userName: 'Anastasia',
      text: 'Shshshs',
    },
    likes: 15,
  },
]
tweets.forEach(async (tweet) => {
  const tweetCmd = postTweet(tweet.tweetData)
  try {
    const res = await runCurl(tweetCmd)
    console.log('tweet', res)

    const tweetId = JSON.parse(res).id
    console.log('id', tweetId)

    // like it
    for (let i = 0; i < tweet.likes; i++) {
      await runCurl(likeTweet(tweetId))
    }
  } catch (err) {
    console.error('Something went wrong:', err)
  }
})

const Tweet = require('../models/tweet.models.js')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')

const mockTweets = require('./tweets.mock')

describe('api/tweets', () => {
  beforeEach(async () => {
    await Tweet.deleteMany({})
  })

  describe('GET /', () => {
    it('should return all tweets', async () => {
      const tweets = mockTweets
      await Tweet.insertMany(tweets)
      const res = await request(app).get('/api/tweets')
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(2)
    })

    it('should return 400 error when invalid tweet id is passed', async () => {
      const res = await request(app).get('/api/tweets/1')
      expect(res.status).to.equal(400)
    })

    it('should return 404 error when valid but non-existing tweet id is passed', async () => {
      const res = await request(app).get('/api/tweets/5f440f544c454a5782fb0895')
      expect(res.status).to.equal(404)
    })
  })

  describe('POST /', () => {
    it('Should return tweet data when all request body is valid', async () => {
      const res = await request(app).post('/api/tweets').send(mockTweets[0])
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('userName', mockTweets[0].userName)
      expect(res.body).to.have.property('text', mockTweets[0].text)
      expect(res.body).to.have.property('likes', mockTweets[0].likes)
    })
  })
})

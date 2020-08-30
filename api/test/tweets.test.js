const Tweet = require('../models/tweet.models.js')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')

describe('api/tweets', () => {
  beforeEach(async () => {
    await Tweet.deleteMany({})
  })

  describe('GET /', () => {
    it('should return all tweets', async () => {
      const tweets = [
        {
          userName: 'test user',
          text: 'test text',
          created: '2020-08-25T01:28:28.473Z',
          updated: '2020-08-25T01:28:28.473Z',
          likes: 2,
        },
        {
          userName: 'test user 2',
          text: 'test text 2',
          created: '2020-08-25T01:28:28.473Z',
          updated: '2020-08-25T01:28:28.473Z',
          likes: 20,
        },
      ]
      await Tweet.insertMany(tweets)
      console.log(tweets)
      const res = await request(app).get('/api/tweets')
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(2)
    })
  })
})

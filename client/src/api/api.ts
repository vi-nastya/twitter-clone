import { apiClient } from './api-client'
import { TweetData } from './api-types'

export const Api = {
  // TODO: auth

  tweets: {
    async create(data: TweetData) {
      const response = await apiClient.post('/tweets', data)
      return response.data
    },
    async getById(id: number) {
      const response = await apiClient.get(`/tweets/${id}`)
      return response.data
    },
  },
}

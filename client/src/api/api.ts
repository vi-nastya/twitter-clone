import { apiClient } from './api-client'
import { TweetData } from './api-types'

class Api {
  constructor() {}

  async tweetsGet() {
    const response = await apiClient.get('/tweets')
    return response.data
  }

  async tweetCreate(data: Omit<TweetData, 'id'>) {
    const response = await apiClient.post('/tweets', data)
    return response.data
  }

  async tweetGetById(id: string) {
    const response = await apiClient.get(`/tweets/${id}`)
    return response.data
  }

  async tweetUpdate(id: string, data: TweetData) {
    const response = await apiClient.put(`/tweets/${id}`, data)
    return response.data
  }

  async tweetDelete(id: string) {
    const response = await apiClient.delete(`/tweets/${id}`)
    return response.data
  }
}

export const api = new Api()

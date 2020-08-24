import { apiClient } from './api-client'
import { NewTweetData } from './api-types'

class Api {
  constructor() {}

  async tweetsGet() {
    const response = await apiClient.get('/tweets')
    return response.data
  }

  async tweetCreate(data: NewTweetData) {
    const response = await apiClient.post('/tweets', data)
    return response.data
  }

  async tweetGetById(id: string) {
    const response = await apiClient.get(`/tweets/${id}`)
    return response.data
  }

  async tweetUpdate(id: string, data: NewTweetData) {
    const response = await apiClient.put(`/tweets/${id}`, data)
    return response.data
  }

  async tweetDelete(id: string) {
    const response = await apiClient.delete(`/tweets/${id}`)
    return response.data
  }

  async tweetLike(id: string) {
    const response = await apiClient.post(`/tweets/${id}/like`)
    return response.data
  }
}

export const api = new Api()

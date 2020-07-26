import { apiClient } from './api-client'

export const Api = {
  // TODO: auth

  tweets: {
    async create(data) {
      const response = await apiClient.post('/tweets', data)
      return response.data
    },
    async getById(id) {
      const response = await apiClient.get(`/tweets/${id}`)
      return response.data
    },
  },
}

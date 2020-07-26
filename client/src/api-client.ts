import axios from 'axios'

const baseUrl = 'http://localhost:9000'

export const apiClient = axios.create({
  baseURL: baseUrl,
  validateStatus: (status) => (status >= 200 && status < 300) || status === 404,
})

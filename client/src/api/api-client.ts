import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:9000/api'

export const apiClient = axios.create({
  baseURL: baseUrl,
  validateStatus: (status) => (status >= 200 && status < 300) || status === 404,
})

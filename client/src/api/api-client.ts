import axios from 'axios'

//const baseUrl = 'http://138.68.37.219:9324/api'
// local setup
const baseUrl = 'http://localhost:9000/api'

export const apiClient = axios.create({
  baseURL: baseUrl,
  validateStatus: (status) => (status >= 200 && status < 300) || status === 404,
})

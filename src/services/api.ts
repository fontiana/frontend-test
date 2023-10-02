import axios from 'axios'

export const binanceApi = axios.create({
  baseURL: process.env.API_REST_URL,
})

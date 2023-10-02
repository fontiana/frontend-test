import axios from 'axios'

export const binanceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_REST_URL,
})

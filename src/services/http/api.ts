import axios from 'axios';

const api = axios.create({
  baseURL: 'https://data.binance.com/api/v3/',
});

export default api;

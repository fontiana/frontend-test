import axios from "axios";

export const getExchangeInfo = () => {
  return axios.get(`https://api.binance.com/api/v3/exchangeInfo`);
};

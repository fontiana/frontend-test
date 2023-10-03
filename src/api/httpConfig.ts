import axios from "axios";

const apiUrl = "https://api.binance.com/api/v3";

const Api = axios.create({
  baseURL: `${apiUrl}`,
});

export default Api;

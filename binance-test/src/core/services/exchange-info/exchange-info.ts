import axios from 'axios';

const exchangeInfo = () => axios.get('https://data.binance.com/api/v3/exchangeInfo');

export default exchangeInfo;
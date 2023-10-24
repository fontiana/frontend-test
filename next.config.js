/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    URL_EXCHANGE_INFO: process.env.URL_EXCHANGE_INFO,
    URL_WEBSOCKET: process.env.URL_WEBSOCKET,
    BASE_URL: process.env.BASE_URL,
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

module.exports = nextConfig;

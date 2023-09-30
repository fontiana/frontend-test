/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    URL_EXCHANGE_INFO: process.env.URL_EXCHANGE_INFO,
    URL_WEBSOCKET: process.env.URL_WEBSOCKET,
  },
};

module.exports = nextConfig;

import { defineConfig } from "cypress";
require("dotenv").config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    env: {
      BASE_URL: process.env.BASE_URL,
      URL_EXCHANGE_INFO: process.env.URL_EXCHANGE_INFO,
    },
  },
});

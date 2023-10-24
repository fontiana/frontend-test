import axios, { HeadersDefaults } from "axios";

export interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string | null;
}

export function getAPIClient(ctx?: any) {
  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });

  return api;
}

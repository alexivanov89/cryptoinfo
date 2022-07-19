import axios from 'axios';

export const BASE_URL = 'https://api.coingecko.com/api/v3/';

export const coinGeckoApi = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

coinGeckoApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

coinGeckoApi.interceptors.response.use(
  (response) => {
    return response;
  },
  () => {},
);

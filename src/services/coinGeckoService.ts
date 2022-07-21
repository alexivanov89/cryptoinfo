import { coinGeckoApi } from './coinGeckoApi';

export const coinGeckoService = {
  getCoins: (config = {}) =>
    coinGeckoApi.get(
      `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      config,
    ),
  getCoin: (id: string, config = {}) => coinGeckoApi.get(`coins/${id}`, config),
  getChart: (id: string, days = 365, config = {}) =>
    coinGeckoApi.get(
      `coins/${id}/market_chart?vs_currency=usd&days=${days}`,
      config,
    ),
};

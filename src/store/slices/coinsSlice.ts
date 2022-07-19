/* eslint-disable import/no-cycle */
import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { coinGeckoService } from '../../services/coinGeckoService';

export interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null;
  last_updated: string;
}

export interface Roi {
  times: number;
  currency: Currency;
  percentage: number;
}

export enum Currency {
  Btc = 'btc',
  Eth = 'eth',
  Usd = 'usd',
}

export interface ICurrentCoin {
  value: ICoin | null;
  isLoading: boolean;
  error: null | SerializedError;
}

export interface ICoins {
  values: ICoin[] | null;
  isLoading: boolean;
  error: null | SerializedError;
}

export interface ICoinsState {
  coins: ICoins;
  currentCoin: ICurrentCoin;
}

const initialState: ICoinsState = {
  coins: {
    values: null,
    isLoading: false,
    error: null,
  },
  currentCoin: {
    value: null,
    isLoading: false,
    error: null,
  },
};

export const fetchCoins = createAsyncThunk(
  'coins/fetchCoins',
  async (config?: object) => {
    const response = await coinGeckoService.getCoins(config);
    return response.data;
  },
);

export const fetchCurrentCoin = createAsyncThunk(
  'coins/fetchCurrentCoin',
  async (id: string, config?: object) => {
    const response = await coinGeckoService.getCoin(id, config);
    return response.data;
  },
);

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.coins.isLoading = true;
        state.coins.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.coins.values = action.payload;
        state.coins.isLoading = false;
        state.coins.error = null;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.currentCoin.isLoading = true;
        state.currentCoin.error = action.error;
      })
      .addCase(fetchCurrentCoin.pending, (state) => {
        state.currentCoin.isLoading = true;
        state.currentCoin.error = null;
      })
      .addCase(fetchCurrentCoin.fulfilled, (state, action) => {
        state.currentCoin.value = action.payload;
        state.currentCoin.isLoading = false;
        state.currentCoin.error = null;
      })
      .addCase(fetchCurrentCoin.rejected, (state, action) => {
        state.currentCoin.isLoading = true;
        state.currentCoin.error = action.error;
      });
  },
});

export const selectCoins = (state: RootState) => state.coins.coins;
export const selectCurrentCoin = (state: RootState) => state.coins.currentCoin;

export const coinsReducer = coinsSlice.reducer;

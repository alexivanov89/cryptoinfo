/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { coinGeckoService } from '../../services/coinGeckoService';
import { ICoinsState } from '../../types.ts/coins';

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

/* eslint-disable import/no-cycle */
import { combineReducers } from '@reduxjs/toolkit';
import { coinsReducer } from './coinsSlice';

export const rootReducer = combineReducers({
  coins: coinsReducer,
});

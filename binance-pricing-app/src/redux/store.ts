import { configureStore } from '@reduxjs/toolkit';
import symbolsReducer from './symbolsSlice';

const store = configureStore({
  reducer: {
    symbols: symbolsReducer,
  },
});

export default store;

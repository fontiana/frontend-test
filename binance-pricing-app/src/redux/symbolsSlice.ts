import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SymbolsState {
  symbols: string[];
  loading: boolean;
}

const initialState: SymbolsState = {
  symbols: [],
  loading: true,
};

const symbolsSlice = createSlice({
  name: 'symbols',
  initialState,
  reducers: {
    setSymbols: (state, action: PayloadAction<string[]>) => {
      state.symbols = action.payload;
      state.loading = false;
    },
  },
});

export const { setSymbols } = symbolsSlice.actions;

export default symbolsSlice.reducer;

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SymbolItemType {
  index: number;
  symbol: string;
}
export interface SymbolsListType {
  symbols: SymbolItemType[];
}

const initialState: SymbolsListType = {
  symbols: [],
};

export const listSlice = createSlice({
  name: "symbols",
  initialState,
  reducers: {
    addSymbols: (state, action: PayloadAction<SymbolItemType[]>) => {
      state.symbols = action.payload;
    },
    clearSymbols: (state) => {
      state.symbols = [];
    },
  },
});

export const { addSymbols, clearSymbols } = listSlice.actions;
export default listSlice.reducer;

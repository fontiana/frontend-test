import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface PriceType {
  lastPrice: string;
  bestBidPrice: string;
  bestAskPrice: string;
  priceChangePercent: string;
  symbol: string;
}
export interface DataPriceType {
  symbols: PriceType[];
}

const initialState: DataPriceType = {
  symbols: [],
};

export const listSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    addPrices: (state, action: PayloadAction<PriceType>) => {
      const alredyExist = state.symbols.find(
        (register) => register.symbol == action.payload.symbol
      );
      state.symbols = alredyExist
        ? state.symbols.map((register) => {
            return register.symbol == action.payload.symbol
              ? action.payload
              : register;
          })
        : [...state.symbols, action.payload];
      // state.symbols = state.symbols.map((data) => {
      //   return data.symbol == action.payload.symbol ? action.payload : data;
      // });
    },
    removePrices: (state) => {
      state.symbols = [];
    },
  },
});

export const { addPrices, removePrices } = listSlice.actions;
export default listSlice.reducer;

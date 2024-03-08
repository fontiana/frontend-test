export interface ISymbolActions {
  type: ESymbolsActionsTypes;
  payload?: any;
}

export enum ESymbolsActionsTypes {
  GET_ALL_DATA = "GET_ALL_DATA",
  SET_CHECKED_SYMBOLS = "SET_CHECKED_SYMBOLS",
  INITIAL_STATE = "INITIAL_STATE",
}

export interface ISymbols {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  allowTrailingStop: boolean;
  cancelReplaceAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: any[];
  permissions: string[];
  defaultSelfTradePreventionMode: string;
  allowedSelfTradePreventionModes: string[];
}

export interface ISymbolContext {
  symbol: ISymbols[] | [];
}

export interface ISymbolDispatchContext {
  handleSymbolValue: (newSymbol: ISymbols | null) => void;
}

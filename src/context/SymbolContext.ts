import { createContext } from "react";
import {
  ISymbolContext,
  ISymbolDispatchContext,
} from "../models/SymbolsModels";

const SYMBOLS_CONTEXT_INITIAL_VALUES = {
  SymbolsContext: {
    symbol: [],
    wwsSymbolString: "",
  },
  SymbolsDispatchContextMethods: {
    handleSymbolValue: () => {},
  },
};

export const SymbolsContext = createContext<ISymbolContext>(
  SYMBOLS_CONTEXT_INITIAL_VALUES.SymbolsContext
);
export const SymbolsDispatchContext = createContext<ISymbolDispatchContext>(
  SYMBOLS_CONTEXT_INITIAL_VALUES.SymbolsDispatchContextMethods
);

import { useState } from "react";
import {
  SymbolsContext,
  SymbolsDispatchContext,
} from "./../context/SymbolContext";
import { ISymbols } from "../models/SymbolsModels";

export const SymbolProvider = ({ children }: any) => {
  const [symbol, setSymbol] = useState<ISymbols[]>([]);

  const handleSymbolValue = (newSymbol: ISymbols | null) => {
    if (newSymbol) {
      setSymbol([...symbol, newSymbol]);
    }
  };

  const symbolContextValue = {
    symbol,
  };

  const symbolContextDispatchMethods = {
    handleSymbolValue,
  };

  return (
    <SymbolsContext.Provider value={symbolContextValue}>
      <SymbolsDispatchContext.Provider value={symbolContextDispatchMethods}>
        {children}
      </SymbolsDispatchContext.Provider>
    </SymbolsContext.Provider>
  );
};

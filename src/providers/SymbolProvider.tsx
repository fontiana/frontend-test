import { useEffect, useState } from "react";
import {
  SymbolsContext,
  SymbolsDispatchContext,
} from "./../context/SymbolContext";
import { ISymbols } from "../models/SymbolsModels";

export const SymbolProvider = ({ children }: any) => {
  const [symbol, setSymbol] = useState<ISymbols[]>([]);
  const [wwsSymbolString, setwwsSymbolString] = useState<string>("");

  const handleSymbolValue = (newSymbol: ISymbols | null) => {
    if (newSymbol) {
      setSymbol([...symbol, newSymbol]);
    }
  };

  useEffect(() => {
    setwwsSymbolString(() => {
      let connectionString = "wss://data-stream.binance.com/stream?streams=";

      symbol.forEach((symbol) => {
        connectionString += symbol.symbol + "/";
      });

      return connectionString;
    });
  }, [symbol]);

  const symbolContextValue = {
    symbol,
    wwsSymbolString,
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

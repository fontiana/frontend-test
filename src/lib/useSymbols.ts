import React, { useState } from "react";
import { useQuery } from "react-query";

export type Symbol = {
  name: string;
  checked: boolean;
};

export default function useSymbols() {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const { isLoading } = useQuery(
    "symbolData",
    async () => {
      const response = await fetch(
        "https://data.binance.com/api/v3/exchangeInfo"
      );
      return response.json() as Promise<{ symbols: Array<{ symbol: string }> }>;
    },
    {
      refetchOnWindowFocus: false,
      select: (binanceSymbols) => {
        return binanceSymbols.symbols.map((symbol) => {
          return {
            name: symbol.symbol,
            checked: false,
          };
        });
      },
      onSuccess: (data) => {
        setSymbols(data);
      },
    }
  );

  const handleSelectSymbol = (symbol: Symbol) => {
    setSymbols((prevSymbolList) => {
      return prevSymbolList.map((item) => {
        if (item.name === symbol.name) {
          return { ...symbol, checked: !symbol.checked };
        }
        return item;
      });
    });
  };

  const unselectAll = () => {
    setSymbols((prevSymbols) =>
      prevSymbols.map((symbol) => {
        return { ...symbol, checked: false };
      })
    );
  };

  return { symbols, isLoading, unselectAll, handleSelectSymbol };
}

import { createContext, useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

export type Symbol = {
  name: string;
  checked: boolean;
};

interface SymbolContextProps {
  symbols: Array<Symbol>;
  selectedSymbols: Array<Symbol>;
  handleSelectSymbol: (symbol: Symbol) => void;
}

const SymbolContext = createContext({} as SymbolContextProps);

export function SymbolContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [symbols, setSymbols] = useState<Symbol[]>([]);

  const { data, isLoading } = useQuery(
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
          const obj: Symbol = {
            name: symbol.symbol,
            checked: false,
          };

          return obj;
        });
      },
      onSuccess: (data) => {
        console.log({ data });
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

  const selectedSymbols = useMemo(() => {
    return symbols.filter((symbol) => symbol.checked);
  }, [symbols]);

  return (
    <SymbolContext.Provider
      value={{
        symbols,
        selectedSymbols,
        handleSelectSymbol,
      }}
    >
      {children}
    </SymbolContext.Provider>
  );
}

export const useSymbols = () => useContext(SymbolContext);

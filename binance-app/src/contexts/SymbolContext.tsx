import { ReactNode, createContext, useState } from 'react';
import { UseQueryResult, useQuery } from 'react-query';

interface SymbolContextProviderProps {
  children: ReactNode;
}

interface SymbolContextType {
  symbolsQuery: UseQueryResult<SymbolData>;
  symbols: Symbol[];
  allChecked: boolean;
  checkAllSymbols: () => void;
  checkSymbol: (symbolName: string) => void;
}

export interface SymbolData {
  symbols: Array<{
    symbol: string;
  }>;
}

export type Symbol = {
  name: string;
  checked: boolean;
};

export const SymbolContext = createContext({} as SymbolContextType);

export function SymbolContextProvider({
  children,
}: SymbolContextProviderProps) {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const symbolsQuery = useQuery<SymbolData>(
    'symbolData',
    () =>
      fetch('https://data.binance.com/api/v3/exchangeInfo').then((res) =>
        res.json()
      ),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const updatedSymbolsResponse = data.symbols.map(({ symbol }) => ({
          name: symbol,
          checked: false,
        }));

        setSymbols(updatedSymbolsResponse);
      },
    }
  );

  function checkSymbol(symbolName: string) {
    const checkedSymbols = symbols.map((symbol) =>
      symbol.name === symbolName
        ? {
            ...symbol,
            checked: !symbol.checked,
          }
        : symbol
    );

    setSymbols(checkedSymbols);
  }

  function checkAllSymbols() {
    const checkedSymbols = symbols.map((symbol) => ({
      ...symbol,
      checked: !allChecked,
    }));

    setSymbols(checkedSymbols);
    setAllChecked(!allChecked);
  }

  return (
    <SymbolContext.Provider
      value={{
        symbolsQuery,
        symbols,
        allChecked,
        checkSymbol,
        checkAllSymbols,
      }}
    >
      {children}
    </SymbolContext.Provider>
  );
}

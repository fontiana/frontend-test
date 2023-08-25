import { ReactNode, createContext } from 'react';
import { UseQueryResult, useQuery } from 'react-query';

interface SymbolContextProviderProps {
  children: ReactNode;
}

interface SymbolContextType {
  symbolsQuery: UseQueryResult<SymbolData>;
}

export interface SymbolData {
  symbols: Array<{
    symbol: string;
  }>;
}

export const SymbolContext = createContext({} as SymbolContextType);

export function SymbolContextProvider({
  children,
}: SymbolContextProviderProps) {
  const symbolsQuery = useQuery<SymbolData>(
    'symbolData',
    () =>
      fetch('https://data.binance.com/api/v3/exchangeInfo').then((res) =>
        res.json()
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <SymbolContext.Provider value={{ symbolsQuery }}>
      {children}
    </SymbolContext.Provider>
  );
}

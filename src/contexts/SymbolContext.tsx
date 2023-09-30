// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {ReactNode, createContext, useEffect, useState} from 'react';
import api from '../services/http/api';

interface ISymbolDTO {
  symbol: string;
}

interface ProviderProps {
  children: ReactNode;
}

interface ContextProps {
  symbols: ISymbolDTO[];
}
export const SymbolContext = createContext({} as ContextProps);

export function SymbolContextProvider({children}: ProviderProps) {
  const [symbols, setSymbols] = useState<ISymbolDTO[]>([]);

  async function getSymbols() {
    try {
      const {data} = await api.get('exchangeInfo');
      setSymbols(data.symbols);
    } catch (error) {}
  }

  useEffect(() => {
    getSymbols();
  }, []);

  return (
    <SymbolContext.Provider value={{symbols}}>
      {children}
    </SymbolContext.Provider>
  );
}

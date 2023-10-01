// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {ReactNode, createContext, useEffect, useState} from 'react';
import api from '../services/http/api';

interface ISymbolDTO {
  name: string;
  checked: boolean;
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
      const newSymbols: ISymbolDTO[] = [];
      for (let index = 0; index < data.symbols.length; index++) {
        let symbol = data.symbols[index];

        symbol = {
          name: symbol.symbol,
          checked: false,
        };

        newSymbols.push(symbol);
      }

      setSymbols(newSymbols);
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

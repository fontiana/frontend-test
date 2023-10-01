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
  handleSymbolCheck: (name: string) => void;
}

export const SymbolContext = createContext({} as ContextProps);

export function SymbolContextProvider({children}: ProviderProps) {
  const [symbols, setSymbols] = useState<ISymbolDTO[]>([]);

  async function getSymbols() {
    try {
      const {data} = await api.get('exchangeInfo');
      const serializedSymbols: ISymbolDTO[] = [];
      for (let index = 0; index < data.symbols.length; index++) {
        let symbol = data.symbols[index];

        symbol = {
          name: symbol.symbol,
          checked: false,
        };

        serializedSymbols.push(symbol);
      }

      setSymbols(serializedSymbols);
    } catch (error) {}
  }

  function handleSymbolCheck(name: string) {
    const serializedSymbols = symbols.map(symbol =>
      symbol.name === name
        ? {
            ...symbol,
            checked: !symbol.checked,
          }
        : symbol,
    );

    setSymbols(serializedSymbols);
  }

  useEffect(() => {
    getSymbols();
  }, []);

  return (
    <SymbolContext.Provider value={{symbols, handleSymbolCheck}}>
      {children}
    </SymbolContext.Provider>
  );
}

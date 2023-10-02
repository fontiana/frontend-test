// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {ReactNode, createContext, useEffect, useState} from 'react';
import api from '../services/http/api';

interface Symbol {
  name: string;
  checked: boolean;
}

interface List {
  id: number;
  name: string;
  symbols: Symbol[];
}

interface ProviderProps {
  children: ReactNode;
}

interface ContextProps {
  symbols: Symbol[];
  userLists: List[];
  handleSymbolCheck: (name: string) => void;
  createUserList: () => void;
  changeCurrentUserListIndex: (index: number) => void;
  addCheckedSymbolsToList: () => void;
}

export const SymbolContext = createContext({} as ContextProps);

export function SymbolContextProvider({children}: ProviderProps) {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [userLists, setUserLists] = useState<List[]>([
    {
      id: 1,
      name: 'List 1',
      symbols: [],
    },
  ]);
  const [currentUserListIndex, setCurrentUserListIndex] = useState<number>(0);

  async function getSymbols() {
    try {
      const {data} = await api.get('exchangeInfo');
      const serializedSymbols: Symbol[] = [];
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

  function createUserList() {
    setUserLists([
      ...userLists,
      {
        id: userLists.length + 1,
        name: `List ${userLists.length + 1}`,
        symbols: [],
      },
    ]);
  }

  function addCheckedSymbolsToList() {
    const checkedSymbols = symbols.filter(symbol => symbol.checked == true);
    if (checkedSymbols.length > 0) {
      checkedSymbols.map(symbol =>
        userLists[currentUserListIndex].symbols.push(symbol),
      );
    }

    getSymbols();
  }

  function changeCurrentUserListIndex(index: number) {
    setCurrentUserListIndex(index);
  }

  useEffect(() => {
    getSymbols();
  }, []);

  return (
    <SymbolContext.Provider
      value={{
        symbols,
        userLists,
        handleSymbolCheck,
        createUserList,
        changeCurrentUserListIndex,
        addCheckedSymbolsToList,
      }}>
      {children}
    </SymbolContext.Provider>
  );
}

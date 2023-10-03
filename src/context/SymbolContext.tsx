import { createContext, useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

export type SymbolList = {
  name: string;
  symbols: string[];
};

interface SymbolContextValue {
  symbolLists: Array<SymbolList>;
  selectedList: SymbolList;
  createSymbolList: (name: string) => void;
  addSymbolsToList: (symbols: string[]) => void;
  selectList: (name: string) => void;
}

const SymbolContext = createContext({} as SymbolContextValue);

const defaultLists: Array<SymbolList> = [
  {
    name: "List 1",
    symbols: [],
  },
];

export function SymbolContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [symbolLists, setSymbolLists] = useState<SymbolList[]>(defaultLists);
  const [selectedListIndex, setSelectedListIndex] = useState(0);

  const selectedList = symbolLists[selectedListIndex];

  const createSymbolList = (name: string) => {
    if (symbolLists.find((sl) => sl.name === name)) return;

    const newList: SymbolList = {
      name,
      symbols: [],
    };

    setSymbolLists((prevLists) => [...prevLists, newList]);
    setSelectedListIndex(symbolLists.length);
  };

  const addSymbolsToList = (symbols: string[]) => {
    setSymbolLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.name === selectedList.name) {
          return {
            ...selectedList,
            symbols,
          };
        }
        return list;
      });
    });
  };

  const selectList = (name: string) => {
    const index = symbolLists.findIndex((list) => list.name === name);
    if (index > -1) {
      setSelectedListIndex(index);
    }
  };

  return (
    <SymbolContext.Provider
      value={{
        symbolLists,
        selectedList,
        createSymbolList,
        addSymbolsToList,
        selectList,
      }}
    >
      {children}
    </SymbolContext.Provider>
  );
}

export const useSymbolsContext = () => useContext(SymbolContext);

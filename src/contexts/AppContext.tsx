import React, { createContext, useContext, useState } from "react";
import { StreamList } from "../types/StreamList";

interface AppContextProps {
  symbols: string[];
  setSymbols: React.Dispatch<React.SetStateAction<string[]>>;
  streamLists: StreamList[];
  setStreamLists: React.Dispatch<React.SetStateAction<StreamList[]>>;
  selectedStreamList: string;
  setSelectedStreamList: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialSelectedStreamList = { name: "List 1", symbols: [] };
  var [symbols, setSymbols] = useState<string[]>([]);
  const [streamLists, setStreamLists] = useState<StreamList[]>([
    initialSelectedStreamList,
  ]);
  const [selectedStreamList, setSelectedStreamList] = useState<string>(
    initialSelectedStreamList.name
  );

  

  return (
    <AppContext.Provider
      value={{
        symbols,
        setSymbols,
        streamLists,
        setStreamLists,
        selectedStreamList,
        setSelectedStreamList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }

  return context;
};

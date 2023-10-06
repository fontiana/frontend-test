import React, { createContext, useContext, useState } from "react";

interface SymbolContextType {
  symbolsList: { [key: string]: any }[];
  setSymbolsList: (list: { [key: string]: any }[]) => void;
}

const SymbolContext = createContext<SymbolContextType | undefined>(undefined);

export const useSymbolContext = () => {
  const context = useContext(SymbolContext);
  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
};

export const SymbolProvider: React.FC<any> = ({ children }) => {
  const [symbolsList, setSymbolsList] = useState<any[]>([]);

  return (
    <SymbolContext.Provider
      value={{ symbolsList, setSymbolsList }}
    >
      {children}
    </SymbolContext.Provider>
  );
};
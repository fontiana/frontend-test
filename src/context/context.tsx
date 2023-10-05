import React, { createContext, useContext, useState } from "react";

interface SymbolContextType {
  symbolContext: { symbol: string }[];
  setSymbolContext: (symbols: { symbol: string }[]) => void;
  symbolsList: any[];
  setSymbolsList: (list: any) => void;
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
  const [symbolContext, setSymbolContext] = useState<any[]>([]);
  const [symbolsList, setSymbolsList] = useState<any[]>([]);

  return (
    <SymbolContext.Provider
      value={{ symbolContext, setSymbolContext, symbolsList, setSymbolsList }}
    >
      {children}
    </SymbolContext.Provider>
  );
};

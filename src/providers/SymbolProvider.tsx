import { useContext } from "react";
import { SymbolContext } from "./../context/SymbolContext";

export const SymbolProvider = ({ children }: any) => {
  const symbol = useContext(SymbolContext);
  return (
    <SymbolContext.Provider value={symbol}>{children}</SymbolContext.Provider>
  );
};

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SymbolI {
  symbol: string;
  checked: boolean;
}

interface ExchangeInfoI {
  exchanges: SymbolI[];
  setExchange: Dispatch<SetStateAction<SymbolI[]>>;
}

const ExchangeInfoContext = createContext<ExchangeInfoI | undefined>(undefined);

export const ExchangeInfoProvider = ({ children }: { children: ReactNode }) => {
  const [exchanges, setExchange] = useState<SymbolI[]>([]);

  return (
    <ExchangeInfoContext.Provider value={{ exchanges, setExchange }}>
      {children}
    </ExchangeInfoContext.Provider>
  );
};

export const useExchangeInfo = () => {
  const context = useContext(ExchangeInfoContext);

  if (!context) {
    throw new Error(
      "useExchangeInfo must be used within an ExchangeInfoProvider"
    );
  }

  return context;
};

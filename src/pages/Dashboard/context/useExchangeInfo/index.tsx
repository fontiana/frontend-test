import React, { createContext, useContext, ReactNode, useReducer } from "react";
import { reducer } from "./reducer";
import { ACTION_TYPE, TAction } from "./actions";
import { TExchangeInfo } from "../../types";

type TSymbolContext = {
  exchanges: {
    currentList: string;
    lists: TExchangeInfo | {};
  };
  dispatchExchanges: React.Dispatch<TAction>;
};

const ExchangeInfoContext = createContext<TSymbolContext | undefined>(
  undefined
);

export const ExchangeInfoProvider = ({ children }: { children: ReactNode }) => {
  const [exchanges, dispatchExchanges] = useReducer(reducer, {
    currentList: "",
    lists: {},
  });

  return (
    <ExchangeInfoContext.Provider value={{ exchanges, dispatchExchanges }}>
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

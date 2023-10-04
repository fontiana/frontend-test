import React, { createContext, useContext, ReactNode, useReducer } from "react";
import { reducer } from "./reducer";
import { ACTION_TYPE } from "./actions";

type ActionI = {
  type: ACTION_TYPE;
  payload: any;
};

interface SymbolContextI {
  exchanges: {
    currentList: string;
    lists: any;
  };
  dispatchExchanges: React.Dispatch<ActionI>;
}

const ExchangeInfoContext = createContext<SymbolContextI | undefined>(
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

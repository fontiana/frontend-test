"use client";
import { createContext } from "react";

import { store } from "@/app/store";
import { Provider } from "react-redux";

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const GlobalContext = createContext(null);

  return (
    <GlobalContext.Provider value={null}>
      <Provider store={store}>{children}</Provider>
    </GlobalContext.Provider>
  );
};

export default StateProvider;

"use client";
import { createContext } from "react";

import { persistor, store } from "@/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const GlobalContext = createContext(null);

  return (
    <GlobalContext.Provider value={null}>
      <Provider store={store}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </GlobalContext.Provider>
  );
};

export default StateProvider;

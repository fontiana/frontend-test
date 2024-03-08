import groupListSlice from "@/reducers/groupListSlice";
import priceListSlice from "@/reducers/priceListSlice";
import symbolsListSlice from "@/reducers/symbolsListSlice";
import { configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedGroups = persistReducer(persistConfig, groupListSlice);

export const store = configureStore({
  reducer: {
    symbolsList: symbolsListSlice,
    groupsList: persistedGroups,
    priceList: priceListSlice,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

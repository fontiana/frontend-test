import { ESymbolsActionsTypes, ISymbolActions } from "../models/SymbolsModels";

//TODO: Consertar isso aqui.
export const symbolReducer = (state: any, action: ISymbolActions) => {
  switch (action.type) {
    case ESymbolsActionsTypes.GET_ALL_DATA: {
      return {
        ...action.payload,
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

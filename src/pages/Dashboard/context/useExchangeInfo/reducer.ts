import { ExchangeInfoI } from "../../types";
import { ACTION_TYPE } from "./actions";

type Action = { type: ACTION_TYPE; payload?: any };
interface StateI {
  currentList: string;
  lists: ExchangeInfoI | {};
}

export const reducer = (state: StateI, action: Action) => {
  const actionsTypes = {
    [ACTION_TYPE.ADD_NEW_LIST]: {
      ...state,
      currentList: action.payload as string,
      lists: {
        ...state.lists,
        [action.payload]: {},
      },
    },
    [ACTION_TYPE.ALTER_CURRENT_LIST]: {
      ...state,
      currentList: action.payload as string,
    },
    [ACTION_TYPE.ADD_TO_LIST]: {
      ...state,
      lists: {
        ...state.lists,
        [state.currentList]: { ...(action.payload as string[]) },
      },
    },
  };

  return actionsTypes[action.type];
};

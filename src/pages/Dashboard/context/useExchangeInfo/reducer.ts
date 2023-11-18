import { TExchangeInfo } from "../../types";
import { ACTION_TYPE, TAction } from "./actions";

type TState = {
  currentList: string;
  lists: TExchangeInfo | {};
};

export const reducer = (state: TState, action: TAction) => {
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

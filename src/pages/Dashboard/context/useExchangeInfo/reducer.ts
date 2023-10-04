import { ACTION_TYPE } from "./actions";

type Action = { type: ACTION_TYPE; payload?: any };

export const reducer = (state: any, action: Action) => {
  const actionsTypes = {
    [ACTION_TYPE.ADD_NEW_LIST]: {
      ...state,
      currentList: action.payload,
      lists: {
        ...state.lists,
        [action.payload]: {},
      },
    },
    [ACTION_TYPE.ALTER_CURRENT_LIST]: { ...state, currentList: action.payload },
    [ACTION_TYPE.ADD_TO_LIST]: {
      ...state,
      lists: { ...state.lists, [state.currentList]: { ...action.payload } },
    },
  };

  return actionsTypes[action?.type] ?? state;
};

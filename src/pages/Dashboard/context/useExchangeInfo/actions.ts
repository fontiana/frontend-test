export type TAction = { type: ACTION_TYPE; payload?: any };

export enum ACTION_TYPE {
  ADD_TO_LIST = "ADD_TO_LIST",
  ADD_NEW_LIST = "ADD_NEW_LIST",
  ALTER_CURRENT_LIST = "ALTER_CURRENT_LIST",
}

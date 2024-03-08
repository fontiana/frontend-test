export interface ISymbolActions {
  type: ESymbolsActionsTypes;
  payload?: any;
}

export enum ESymbolsActionsTypes {
  GET_ALL_DATA = "GET_ALL_DATA",
}
// TODO: Ajeitar tipagem

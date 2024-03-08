import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SymbolItemType } from "./symbolsListSlice";

export interface AddSymbolType {
  groupIndex: number;
  symbol: string;
}
export interface GroupItemType {
  inputValue?: string;
  index: number;
  name: string;
  symbols: SymbolItemType[];
}
export interface GroupsListType {
  groups: GroupItemType[];
  selected: number | undefined;
}

const initialState: GroupsListType = {
  groups: [],
  selected: undefined,
};

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<{ name: string }>) => {
      state.groups = [
        ...state.groups,
        {
          name: action.payload.name,
          index: state.groups.length + 1,
          symbols: [],
        },
      ];
    },
    removeGroup: (state, action: PayloadAction<GroupItemType>) => {
      state.groups = state.groups.filter(
        (group) => group.index != action.payload.index
      );
    },
    setSelected: (state, action: PayloadAction<number | undefined>) => {
      state.selected = action.payload;
    },
    addSymbols: (state, action: PayloadAction<SymbolItemType[]>) => {
      state.groups = state.groups.map((group) => {
        if (group.index == state.selected) {
          group.symbols = action.payload;
        }
        return group;
      });
    },
  },
});

export const { addGroup, removeGroup, setSelected, addSymbols } =
  groupSlice.actions;
export default groupSlice.reducer;

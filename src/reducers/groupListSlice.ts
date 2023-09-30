import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface GroupItemType {
  inputValue?: string;
  index: number;
  name: string;
}
export interface GroupsListType {
  groups: GroupItemType[];
}

const initialState: GroupsListType = {
  groups: [],
};

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<{ name: string }>) => {
      state.groups = [
        ...state.groups,
        { name: action.payload.name, index: state.groups.length + 1 },
      ];
    },
    removeGroup: (state, action: PayloadAction<GroupItemType>) => {
      state.groups = state.groups.filter(
        (group) => group.index == action.payload.index
      );
    },
  },
});

export const { addGroup, removeGroup } = groupSlice.actions;
export default groupSlice.reducer;

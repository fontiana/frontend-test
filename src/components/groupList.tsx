"use client";
import { RootState } from "@/app/store";
import { addGroup, removeGroup, setSelected } from "@/reducers/groupListSlice";
import { removePrices } from "@/reducers/priceListSlice";
import { SymbolItemType } from "@/reducers/symbolsListSlice";
import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface GroupOptionType {
  inputValue?: string;
  name: string;
  index: number;
  symbols: SymbolItemType[];
}

const filter = createFilterOptions<GroupOptionType>();

export default function GroupList() {
  const dispatch = useDispatch();

  const groupsList = useSelector((state: RootState) => state.groupsList);

  const savedList = groupsList.groups
    .map((group) => {
      return {
        index: group.index,
        name: group.name,
        symbols: [],
      };
    })
    .find((group) => group.index == groupsList.selected);
  const [selectedGroup, setSelectedGroup] = useState<GroupOptionType | null>(
    savedList || null
  );
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      name: "",
      index: 0,
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    name: "",
    index: 0,
  });

  const addGroupList = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectedGroup({
      name: dialogValue.name,
      index: dialogValue.index,
      symbols: [],
    });
    dispatch(setSelected(dialogValue.index));
    dispatch(removePrices());
    dispatch(addGroup({ name: dialogValue.name }));
    handleClose();
  };

  const removeGroupList = () => {
    if (selectedGroup && selectedGroup.index) {
      dispatch(removeGroup(selectedGroup));
      setSelectedGroup({ index: 0, name: "", symbols: [] });
    }
  };

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <Autocomplete
          size="small"
          value={selectedGroup}
          className="grow lg:grow-0"
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpen(true);
                setDialogValue({
                  name: newValue,
                  index: groupsList.groups.length + 1,
                });
              });
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true);
              setDialogValue({
                name: newValue.inputValue,
                index: groupsList.groups.length + 1,
              });
            } else {
              setSelectedGroup(newValue);
              dispatch(setSelected(newValue?.index || undefined));
              dispatch(removePrices());
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
                index: 0,
                symbols: [],
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={groupsList.groups}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.name) {
              return option.name;
            }
            // Regular option
            return option.name;
          }}
          renderOption={(props, option) => (
            <li {...props} key={option.index}>
              {option.name}
            </li>
          )}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => <TextField {...params} label="Lists" />}
        />
        <Tooltip title="Delete selected list">
          <div
            onClick={removeGroupList}
            className="w-10 h-10 rounded cursor-pointer bg-red-400 text-white p-1 flex justify-center items-center"
          >
            <Delete />
          </div>
        </Tooltip>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={addGroupList}>
          <DialogTitle>Add a new symbols list</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to add another symbol list?
            </DialogContentText>
            <TextField
              className="w-full"
              autoFocus
              margin="dense"
              id="symbolListName"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="List name"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

"use client";
import { RootState } from "@/app/store";
import { addGroup } from "@/reducers/groupListSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface GroupOptionType {
  inputValue?: string;
  name: string;
  index: number;
}

const filter = createFilterOptions<GroupOptionType>();

export default function FreeSoloCreateOption() {
  const dispatch = useDispatch();

  const [value, setValue] = useState<GroupOptionType | null>(null);
  const [open, toggleOpen] = useState(false);
  const groupsList = useSelector((state: RootState) => state.groupsList);

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

  const addGroupList = (name: string) => {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
      index: dialogValue.index,
    });
    dispatch(addGroup({ name: dialogValue.name }));
    handleClose();
  };

  return (
    <>
      <h1>Groups:</h1>
      <div className="flex flex-row">
        <Autocomplete
          size="small"
          value={value}
          onChange={(event, newValue) => {
            console.log(`newValue`, newValue);
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
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
                index: 0,
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
          renderInput={(params) => (
            <TextField {...params} label="Select a saved symbols list" />
          )}
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="title"
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

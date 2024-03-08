import { useEffect, useReducer, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { symbolReducer } from "../../reducers/SymbolReducer";
import { ESymbolsActionsTypes } from "../../models/SymbolsModels";

export const CheckboxList = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.binance.com/api/v3/exchangeInfo", {
      signal: controller.signal,
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // TODO: Consertar isso aqui.
        // dispatch({
        //   type: ESymbolsActionsTypes.GET_ALL_DATA,
        //   payload: data.symbols,
        // });
        setData(data.symbols);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      controller.abort();
    };
  }, []); // Calls whenever the component is mounted

  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value.symbol);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%", maxHeight: "100%", overflow: "auto" }}>
      <ListSubheader sx={{ display: "flex" }}>
        <Checkbox edge="start" tabIndex={-1} disableRipple />
        Symbol
      </ListSubheader>

      {data.map((symbol: any) => {
        const labelId = `checkbox-list-label-${symbol.symbol}`;

        return (
          <ListItem key={symbol.symbol} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(symbol)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(symbol) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${symbol.symbol}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

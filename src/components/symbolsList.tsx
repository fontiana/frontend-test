"use client";
import { RootState } from "@/app/store";
import {
  addSymbols as addSymbolToGroup,
  setSelected,
} from "@/reducers/groupListSlice";
import { removePrices } from "@/reducers/priceListSlice";
import {
  SymbolItemType,
  addSymbols,
  clearSymbols,
} from "@/reducers/symbolsListSlice";
import { ExchangeType } from "@/types/exchange";
import {
  Autocomplete,
  Chip,
  CircularProgress,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function SymbolsList() {
  const symbolsList = useSelector((state: RootState) => state.symbolsList);
  const { selected, groups } = useSelector(
    (state: RootState) => state.groupsList
  );
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SymbolItemType[]>([]);
  const [value, setValue] = useState<SymbolItemType[] | undefined>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...symbolsList.symbols]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading, symbolsList.symbols]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    dispatch(clearSymbols());
    const controller = new AbortController();
    const fetchData = async () => {
      await axios
        .get<ExchangeType>(process.env.URL_EXCHANGE_INFO || "")
        .then((response) => {
          const symbols = response.data.symbols;
          const symbolsList = symbols.map(({ symbol }, index) => {
            return {
              index,
              symbol,
            };
          });
          dispatch(addSymbols(symbolsList));
        })
        .catch(() => {
          console.log(controller.signal.aborted);
        });
    };

    fetchData();
    return () => controller.abort();
  }, [dispatch]);

  useEffect(() => {
    if (selected) {
      setSelected(selected);
      dispatch(removePrices());
      setValue(groups[selected - 1]?.symbols || 0);
    } else {
      setSelected();
      dispatch(removePrices());
    }
  }, [selected, groups, dispatch]);

  const addSymbolToList = (symbols: SymbolItemType[]) => {
    dispatch(addSymbolToGroup(symbols));
  };

  return (
    <>
      <div className="flex flex-row items-center w-full">
        <Autocomplete
          multiple
          className="grow"
          disabled={!selected}
          value={selected ? value : []}
          id="asynchronous-demo"
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(event: any, newValue) => {
            setValue(newValue);
            if (newValue) addSymbolToList(newValue);
          }}
          isOptionEqualToValue={(option, value) =>
            option.symbol === value.symbol
          }
          getOptionLabel={(option) => option.symbol}
          options={options}
          loading={loading}
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.index}
                label={option.symbol}
                variant="outlined"
              />
            ));
          }}
          renderOption={(props, option, { selected }) => (
            <li
              {...props}
              key={option.index}
              id={`symbolNumber${option.index}`}
            >
              {option.symbol}
            </li>
          )}
          renderInput={(params) => (
            <Tooltip title={!selected && "First, select a list"}>
              <TextField
                {...params}
                size="small"
                label="Symbol"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            </Tooltip>
          )}
        />
      </div>
    </>
  );
}

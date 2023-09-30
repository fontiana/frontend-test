"use client";
import { RootState } from "@/app/store";
import {
  SymbolItemType,
  addSymbols,
  clearSymbols,
} from "@/reducers/symbolsListSlice";
import { ExchangeType } from "@/types/exchange";
import { AddBox } from "@mui/icons-material";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
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
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SymbolItemType[]>([]);
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
        .get<ExchangeType>("https://data.binance.com/api/v3/exchangeInfo")
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

  return (
    <>
      <h1>Symbols:</h1>
      <div className="flex flex-row">
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) =>
            option.symbol === value.symbol
          }
          getOptionLabel={(option) => option.symbol}
          options={options}
          loading={loading}
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
          )}
        />
        <AddBox className="w-8 h-8 cursor-pointer" />
      </div>
    </>
  );
}

"use client";
import { RootState } from "@/app/store";
import { PriceType, addPrices } from "@/reducers/priceListSlice";
import { WebsocketEnum, WebsocketResponseType } from "@/types/websocket";
import { ExpandLess, ExpandMore, HorizontalRule } from "@mui/icons-material";
import { Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";

export default function PriceTable() {
  const pricesList = useSelector((state: RootState) => state.priceList);
  const [socket, setSocket] = useState(null);
  const { selected, groups } = useSelector(
    (state: RootState) => state.groupsList
  );
  const dispatch = useDispatch();

  let symbolsUrl = groups[(selected || 0) - 1]?.symbols
    .map((item) => `${item.symbol.toLowerCase()}@ticker`)
    .join("/");
  let websocketUrl = symbolsUrl
    ? `${process.env.URL_WEBSOCKET}?streams=${symbolsUrl}`
    : process.env.URL_WEBSOCKET;

  useWebSocket(websocketUrl || "", {
    onOpen: () => console.info(`Connected to websocket server!`),
    onClose: () => console.info(`Disconnecting to websocket server...`),
    onError: (error) =>
      console.error(`Failed to connect to websocket server: ${error}`),
    onMessage: (message: MessageEvent) =>
      SetSymbolPriceData(JSON.parse(message.data)),
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 2 * 1000, //2 segundos
  });

  const SetSymbolPriceData = (symbolData: WebsocketResponseType) => {
    const { data } = symbolData;
    const FilteredData: PriceType = {
      lastPrice: data[WebsocketEnum.LastPrice],
      bestBidPrice: data[WebsocketEnum.LastPrice],
      bestAskPrice: data[WebsocketEnum.BestAskPrice],
      priceChangePercent: data[WebsocketEnum.PriceChangePercent],
      symbol: data[WebsocketEnum.Symbol],
    };
    dispatch(addPrices(FilteredData));
  };

  let selectedsSymbols = groups[(selected || 0) - 1]?.symbols.length || 0;
  let listedSymbols = pricesList.symbols.length || 0;

  function PositiveValue({ value }: { value: number }) {
    if (value == 0) {
      return (
        <Chip
          color="default"
          avatar={<HorizontalRule className="!text-gray" fontSize="small" />}
          label={`${value} %`}
        />
      );
    } else if (value > 0) {
      return (
        <Chip
          color="success"
          avatar={<ExpandLess className="!text-white" fontSize="small" />}
          label={`${value} %`}
        />
      );
    } else {
      return (
        <Chip
          color="error"
          avatar={<ExpandMore className="!text-white" fontSize="small" />}
          label={`${value} %`}
        />
      );
    }
  }

  return (
    <TableContainer
      component={Paper}
      className="my-4"
      id="symbolsDataPriceTable"
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        id="symbolsValuesTable"
      >
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Last price</TableCell>
            <TableCell align="right">Bid price</TableCell>
            <TableCell align="right">Ask price</TableCell>
            <TableCell align="right">Price change (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listedSymbols != 0 &&
            pricesList.symbols.map((price, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {price.symbol}
                </TableCell>
                <TableCell align="right">{price.lastPrice}</TableCell>
                <TableCell align="right">{price.bestBidPrice}</TableCell>
                <TableCell align="right">{price.bestAskPrice}</TableCell>
                <TableCell align="right">
                  <PositiveValue value={+price.priceChangePercent} />
                </TableCell>
              </TableRow>
            ))}
          {selectedsSymbols != 0 && listedSymbols != selectedsSymbols && (
            <TableRow
              key={0}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Loading the data...
              </TableCell>
            </TableRow>
          )}
          {selectedsSymbols == 0 && (
            <TableRow
              key={0}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <span>Select at least one list and one symbol</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

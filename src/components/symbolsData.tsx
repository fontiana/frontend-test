"use client";
import { RootState } from "@/app/store";
import { PriceType, addPrices } from "@/reducers/priceListSlice";
import { WebsocketEnum, WebsocketResponseType } from "@/types/websocket";
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
  const { selected, groups } = useSelector(
    (state: RootState) => state.groupsList
  );
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  let symbolsUrl = groups[(selected || 0) - 1]?.symbols
    .map((item) => `${item.symbol.toLowerCase()}@ticker`)
    .join("/");
  let websocketUrl = symbolsUrl
    ? `${process.env.URL_WEBSOCKET}?streams=${symbolsUrl}`
    : process.env.URL_WEBSOCKET;

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(websocketUrl || "", {
    onOpen: () => console.log(`Connected to websocket server!`),
    onClose: () => console.log(`Disconnecting to websocket server...`),
    onError: (error) =>
      console.log(`Failed to connect to websocket server: ${error}`),
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {pricesList.symbols.length != 0 ? (
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
                <TableCell align="right">{price.priceChangePercent}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              key={0}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <span>Select at least one list and one symbol</span>
              </TableCell>
            </TableRow>
          )}
          {pricesList.symbols.length != 0 &&
            pricesList.symbols.length !=
              groups[(selected || 0) - 1]?.symbols.length && (
              <TableRow
                key={0}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Carregando o restante dos dados...
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

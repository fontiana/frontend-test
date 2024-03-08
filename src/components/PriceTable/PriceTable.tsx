import { useContext, useEffect, useState } from "react";
import { SymbolsContext } from "../../context/SymbolContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { io } from "socket.io-client";
import { ISymbolPayload } from "../../models/SymbolPayloadModels";

export const PriceTable = () => {
  const symbolValue = useContext(SymbolsContext);
  const socket = io(symbolValue.wwsSymbolString);

  const [, setIsConnected] = useState(socket.connected);
  const [symbolPayload, setSymbolPayload] = useState<ISymbolPayload[]>([]);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("24hrTicker", (payload) => {
      setSymbolPayload((lastSymbolPayload) => [
        ...lastSymbolPayload,
        ...payload,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Last Price</TableCell>
            <TableCell align="right">Bid Price&nbsp;</TableCell>
            <TableCell align="right">Ask Price&nbsp;</TableCell>
            <TableCell align="right">Price Change&nbsp;(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {symbolPayload.map((row) => (
            <TableRow key={row.s}>
              <TableCell component="th" scope="row">
                {row.s}
              </TableCell>
              <TableCell align="right">{row.c}</TableCell>
              <TableCell align="right">{row.b}</TableCell>
              <TableCell align="right">{row.a}</TableCell>
              <TableCell align="right">{row.p}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

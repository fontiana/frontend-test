import React from "react";
import DrawerLeft from "../../shared/components/drawer/DrawerLeft";
import { FavContext } from "../../shared/context/FavContext";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TableContainer from "@mui/material/TableContainer";
import { Box, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { io } from "socket.io-client";

interface ITicker {
  stream: string;
  data: {
    c: string;
    b: string;
    a: string;
    P: string;
    s: string;
  };
}

const Favorites = () => {
  const fav = React.useContext(FavContext);
  const padrao = /^.*?(?=@)/;
  console.log(fav);

  const [favTick, setFavTick] = React.useState<ITicker>();

  let symbolStringMethod = fav.favCoins.map(symbolItem => symbolItem.symbol).join("@ticker/").toLowerCase() + "@ticker";

  let arrayFormated = fav.favCoins.join("@ticker/").toLowerCase() + "@ticker";
  console.log(arrayFormated);

  //   let ws = new WebSocket(
  //   'wss://data-stream.binance.com/stream?streams=ethbusd@kline_1m',
  // );
  // let ws = new WebSocket(
  //   'wss://data-stream.binance.com/stream?streams=ethbusd@trade',
  // );
  // let ws = new WebSocket('wss://data-stream.binance.com:9443/ws/etheur@trade')

  let ws = new WebSocket(
    `wss://data-stream.binance.com/stream?streams=${symbolStringMethod}`
  );
  ws.onmessage = (event) => {
    let parseData: ITicker = JSON.parse(event.data);
    console.log(parseData);

    const verifySymbolIndex = fav.favCoins.findIndex(symbolItem => symbolItem.symbol === parseData.data.s)

    if(verifySymbolIndex >= 0){
      const precoAtualizado = [...fav.favCoins]
      precoAtualizado[verifySymbolIndex].price = parseData.data.c
      console.log('if fav.favCoins',fav.favCoins)
    } else {
      console.log('else fav.favCoins',fav.favCoins)
      
      fav.setFavCoins(fav.favCoins.concat({symbol: parseData.data.s, price: parseData.data.c}))
    }

    // setFavTick(oldValues => [...oldValues, {stream: parseData.stream, data: parseData.data}])

  };

  React.useEffect(() => {
    console.log("fav.favCoins", fav.favCoins);
    return () => {
      ws.close();
    };
  }, []);
  return (
    <DrawerLeft pageName="Favorites">
      <>
        <Box display={"flex"} justifyContent={"start"}>
          <TableContainer
            component={Paper}
            sx={{
              overflowX: "auto",
              overflowY: "auto",
              height: {
                xs: "50vh",
                sm: "50vh",
                md: "calc(100% - 240px)",
                lg: "100%",
                xl: "100%",
              },
              width: {
                xs: "80vw",
                sm: "50vw",
                md: "50vw",
                lg: "50vw",
                xl: "50vw",
              },
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={"800"}>Symbol</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography fontWeight={"800"}>Price</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fav ? (
                  fav.favCoins.map((item) => {
                    return (
                      <TableRow key={item.symbol}>
                        <TableCell>{item.symbol}</TableCell>
                        <TableCell>
                          {item.price}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    </DrawerLeft>
  );
};

export default Favorites;

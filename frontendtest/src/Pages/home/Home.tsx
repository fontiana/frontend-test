import React from 'react';
import TableCoins from '../../shared/components/table/TableCoins';
import DrawerLeft from '../../shared/components/drawer/DrawerLeft';


const Home = () => {
  

  // let ws = new WebSocket(
  //   'wss://data-stream.binance.com/stream?streams=ethbusd@kline_1m',
  // );
  // let ws = new WebSocket(
  //   'wss://data-stream.binance.com/stream?streams=ethbusd@trade',
  // );
  // let ws = new WebSocket('wss://data-stream.binance.com:9443/ws/etheur@trade')

  // ws.onmessage = (event) => {
  //   let parseData = JSON.parse(event.data);
  // };


  return (
    <DrawerLeft pageName='Table'>
          <TableCoins />
    </DrawerLeft>
  );
};

export default Home;

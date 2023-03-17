import React from 'react'
import DrawerLeft from '../../shared/components/drawer/DrawerLeft'
import {FavContext} from '../../shared/context/FavContext'
const Favorites = () => {
  const Fav = React.useContext(FavContext)
  console.log(Fav)

    let ws = new WebSocket(
    'wss://data-stream.binance.com/stream?streams=ethbtc@trade',
  );
  //   let ws = new WebSocket(
  //   'wss://data-stream.binance.com/stream?streams=ethbusd@kline_1m',
  // );
  // let ws = new WebSocket(
  //   'wss://data-stream.binance.com/stream?streams=ethbusd@trade',
  // );
  // let ws = new WebSocket('wss://data-stream.binance.com:9443/ws/etheur@trade')

  ws.onmessage = (event) => {
    let parseData = JSON.parse(event.data);
    console.log(parseData)
  };
  return (
    <DrawerLeft pageName='Favorites'>
      <>
      <div>Favorites</div>
      {Fav.favCoins.map(item =>{
        return <p>{item}</p>
      })}
      </>
    </DrawerLeft>
  )
}

export default Favorites
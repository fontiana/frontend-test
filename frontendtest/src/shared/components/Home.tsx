import axios from 'axios'
import React from 'react'
import './Home.css'
const Home = () => {
  let ws = new WebSocket('wss://data-stream.binance.com/stream?streams=ethbusd@kline_1m')
  // let ws = new WebSocket('wss://data-stream.binance.com/stream?streams=crveth@trade')
  // let ws = new WebSocket('wss://data-stream.binance.com:9443/ws/etheur@trade')

  ws.onmessage = (event) => {
    // console.log('1oi')
    let stockObj = JSON.parse(event.data)
    // console.log(stockObj.data);
    // console.log(event.data)

  }

  React.useEffect(() =>{
    axios.get('https://data.binance.com/api/v3/exchangeInfo').then(data =>{
      console.log(data)
    })
  },[])



  return (
    <div className='layout-principal'><p>Home</p></div>
  )
}

export default Home 
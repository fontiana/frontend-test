import React, { useState, useEffect } from 'react';

import {
  SymbolsDetailsContainer,
  SymbolsDetailsTitle,
  SymbolsDetailsTable,
  SymbolsDetailsTableHead,
  SymbolsDetailsTH,
  SymbolsDetailsTD,
  SymbolsDetailsTBody,
  SymbolsDetailsTR,
  SymbolsDetailsLoding,
} from './style.ts';

interface SymbolDetailsProps {
  symbol: string;
}

const SymbolDetails: React.FC<SymbolDetailsProps> = ({ symbol }) => {
  const socketUrl = `wss://data-stream.binance.com/stream?streams=${symbol.toLowerCase()}@ticker`;
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const [bidPrice, setBidPrice] = useState<number | null>(null);
  const [askPrice, setAskPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<string | null>(null);

  useEffect(() => {
    const websocket = new WebSocket(socketUrl);

    websocket.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data from websocket: ', data);
      if (data && data.data) {
        const tradeData = data.data;

        // setSymb(symbol);
        setLastPrice(parseFloat(tradeData.c));
        setBidPrice(parseFloat(tradeData.b));
        setAskPrice(parseFloat(tradeData.a));
        setPriceChange(tradeData.P.toString());
      }
    };

    websocket.onerror = (error) => {
      console.log('WebSocket error => ', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket Client Closed');
    };

    return () => {
      websocket.close();
    };
  }, [socketUrl, symbol]);

  return (
    <>{lastPrice && symbol ? (
      <SymbolsDetailsContainer>
        <SymbolsDetailsTitle>Symbol Details</SymbolsDetailsTitle>
        <SymbolsDetailsTable>
          <SymbolsDetailsTableHead>
            <SymbolsDetailsTR>
              <SymbolsDetailsTH>Symbol</SymbolsDetailsTH>
              <SymbolsDetailsTH>Last Price</SymbolsDetailsTH>
              <SymbolsDetailsTH>Bid Price</SymbolsDetailsTH>
              <SymbolsDetailsTH>Ask Price</SymbolsDetailsTH>
              <SymbolsDetailsTH>Price Change</SymbolsDetailsTH>
            </SymbolsDetailsTR>
          </SymbolsDetailsTableHead>
          <SymbolsDetailsTBody>
            <SymbolsDetailsTR>
              <SymbolsDetailsTD>{symbol}</SymbolsDetailsTD>
              <SymbolsDetailsTD>{lastPrice}</SymbolsDetailsTD>
              <SymbolsDetailsTD>{bidPrice}</SymbolsDetailsTD>
              <SymbolsDetailsTD>{askPrice}</SymbolsDetailsTD>
              <SymbolsDetailsTD>{priceChange}</SymbolsDetailsTD>
            </SymbolsDetailsTR>            
          </SymbolsDetailsTBody>
        </SymbolsDetailsTable>
      </SymbolsDetailsContainer>
    ) : (
      <SymbolsDetailsLoding>Loading...</SymbolsDetailsLoding>
    )}
    </>
  );
};

export default SymbolDetails;

import { useEffect, useState } from "react";

const BASE_URL = "wss://data-stream.binance.vision/stream?streams=";

interface RealtimeSymbolData {
  P: string; // Price change percent
  c: string; // Last price
  b: string; // Best bid price
  a: string; // Best ask price
  s: string; // Symbol
}

interface RealtimeSymbol {
  name: string;
  lastPrice: string;
  bidPrice: string;
  askPrice: string;
  priceChangePercent: string;
}

export default function useRealtimeSymbols(symbols: Array<string>) {
  const [realtimeSymbols, setRealtimeSymbols] = useState<Array<RealtimeSymbol>>(
    []
  );

  useEffect(() => {
    setRealtimeSymbols(
      symbols.map((symbol) => {
        return {
          name: symbol,
          askPrice: "-",
          bidPrice: "-",
          lastPrice: "-",
          priceChangePercent: "-",
        };
      })
    );
  }, [symbols]);

  useEffect(() => {
    if (!realtimeSymbols.length) return;

    const websocket = new WebSocket(
      `${BASE_URL}${symbols
        .map((symbol) => symbol.toLowerCase() + "@ticker")
        .join("/")}`
    );
    websocket.onopen = (msg) => {
      console.log("connected", msg);
    };

    websocket.onmessage = (event) => {
      const { data } = JSON.parse(event.data);
      const realTimeData = data as RealtimeSymbolData;

      setRealtimeSymbols((prevRealtimeSymbols) => {
        return prevRealtimeSymbols.map((prevRealtimeSymbol) => {
          if (prevRealtimeSymbol.name === realTimeData.s) {
            return {
              name: realTimeData.s,
              askPrice: Number(realTimeData.a).toFixed(4),
              bidPrice: Number(realTimeData.b).toFixed(4),
              lastPrice: Number(realTimeData.c).toFixed(4),
              priceChangePercent: realTimeData.P,
            };
          }
          return prevRealtimeSymbol;
        });
      });
    };

    return () => {
      if (websocket.readyState === 1) {
        websocket.close();
      }
    };
  }, [realtimeSymbols.length, symbols]);

  return { realtimeSymbols };
}

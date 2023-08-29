import { Badge } from '@/components/Badge';
import { SymbolContext } from '@/contexts/SymbolContext';
import { PlusCircle } from '@phosphor-icons/react';
import { FormEvent, useContext, useEffect, useState } from 'react';

interface DetailedSymbol {
  lastPrice: number;
  bestBidPrice: number;
  bestAskPrice: number;
  priceChangePercent: string;
}

type Symbol = Record<string, DetailedSymbol>;

interface RealTimeSymbolList {
  detailedSymbols: Symbol;
}

export function PriceDashboard() {
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [lists, setLists] = useState<number[]>([currentListIndex]);
  const [detailedSymbolList, setDetailedSymbolList] =
    useState<RealTimeSymbolList>({
      detailedSymbols: {},
    });

  const { selectedSymbols } = useContext(SymbolContext);

  const BASE_URL = 'wss://stream.binance.com:9443/stream?streams=';

  const url =
    BASE_URL +
    selectedSymbols.map((symbol) => `${symbol.toLowerCase()}@ticker`).join('/');

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = (event) => {
      console.log('Open connection: ', event);
    };

    socket.onerror = (event) => {
      console.log('An error occurred: ', event);
    };

    socket.onmessage = (event) => {
      const { data } = JSON.parse(event.data);

      const formattedData = {
        symbol: data.s,
        lastPrice: Number(data.c).toFixed(4),
        bestBidPrice: Number(data.b).toFixed(4),
        bestAskPrice: Number(data.a).toFixed(4),
        priceChangePercent: data.P,
      };

      setDetailedSymbolList((prev) => ({
        ...prev,
        detailedSymbols: {
          ...prev.detailedSymbols,
          [formattedData.symbol]: formattedData,
        },
      }));
    };

    return () => {
      socket.close();

      socket.onclose = (event) => {
        console.log('Closed connection: ', event);
      };
    };
  }, [url, selectedSymbols]);

  function handleCreateRealTimeSymbolList(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setCurrentListIndex((state) => state + 1);
    setLists((state) => [...state, currentListIndex + 1]);
  }

  return (
    <main className="w-full border border-gray-200 rounded-lg flex-1 flex flex-col gap-3 px-2 py-8 shadow-xl">
      <form onSubmit={handleCreateRealTimeSymbolList} className="flex gap-2">
        <select
          placeholder="Create a new list"
          className="inline-block border border-gray-200 rounded px-3 py-2 w-full min-h-[2.625rem]"
        >
          {lists.map((_, index) => (
            <option key={index}>List {index + 1}</option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-teal-500 p-2 rounded min-w-[2.625rem] flex items-center justify-center transition-colors hover:bg-teal-600"
        >
          <PlusCircle className="w-5 h-5 text-white" />
        </button>
      </form>

      <div className="overflow-auto">
        <table className="w-full">
          <thead className="h-[3.75rem]">
            <tr className="gap-8 bg-gray-200 text-sm sm:text-base whitespace-nowrap">
              <th className="p-4">Symbol</th>
              <th className="p-4">Last Price</th>
              <th className="p-4">Bid Price</th>
              <th className="p-4">Ask Price</th>
              <th className="p-4">Price Change (%)</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(detailedSymbolList.detailedSymbols).map(
              ([
                symbol,
                { bestAskPrice, bestBidPrice, lastPrice, priceChangePercent },
              ]) => {
                const priceChange = Number(priceChangePercent.replace('%', ''));

                return (
                  <tr
                    key={symbol}
                    className="gap-8 text-xs sm:text-base text-center"
                  >
                    <td className="p-4 truncate max-w-[100px]" title={symbol}>
                      {symbol}
                    </td>
                    <td
                      className="p-4 truncate max-w-[100px]"
                      title={String(lastPrice)}
                    >
                      {lastPrice}
                    </td>
                    <td
                      className="p-4 truncate max-w-[100px]"
                      title={String(bestBidPrice)}
                    >
                      {bestBidPrice}
                    </td>
                    <td
                      className="p-4 truncate max-w-[100px]"
                      title={String(bestAskPrice)}
                    >
                      {bestAskPrice}
                    </td>
                    <td
                      className="p-4 truncate max-w-[100px]"
                      title={priceChangePercent}
                    >
                      <Badge isNegative={priceChange < 0}>
                        {priceChangePercent}%
                      </Badge>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

import React, { useEffect, useState } from 'react';
import { useSymbolContext } from '../../context/context';
import * as S from './styles';

const Dashboard: React.FC = () => {
  const { symbolsList } = useSymbolContext();
  const [symbolData, setSymbolData] = useState<any[]>([]);
  const [selectedListIndex, setSelectedListIndex] = useState<number>(0);

  useEffect(() => {
    const selectedList = symbolsList[selectedListIndex];

    if (selectedList) {
      const selectedSymbols = selectedList[`List ${selectedListIndex + 1}`];

      const websocketUrl = `wss://stream.binance.com:9443/stream?streams=${selectedSymbols
        .map((symbol: any) => `${symbol.symbol.toLowerCase()}@ticker`)
        .join('/')}`;

      const socket = new WebSocket(websocketUrl);
      socket.onmessage = (event) => {
        const { data } = JSON.parse(event.data);
        const newSymbolData = {
          symbol: data.s,
          lastPrice: data.c,
          bestBidPrice: data.b,
          bestAskPrice: data.a,
          priceChangePercent: data.P,
        };

        setSymbolData((symbolData) => {
          const updatedData = [...symbolData];
          const existingSymbol = updatedData.findIndex((item) => item.symbol === data.s);
          if (existingSymbol !== -1) {
            updatedData[existingSymbol] = newSymbolData;
          } else {
            updatedData.push(newSymbolData);
          }
          return updatedData;
        });
      };
    }
  }, [symbolsList, selectedListIndex]);

  const handleListSelection = (listName: string) => {
    const selectedListIndex = symbolsList.findIndex((listObject) => listObject[listName]);
    setSelectedListIndex(selectedListIndex);
  };

  return (
    <div>
      <S.DropdownContainer>
        <S.SelectActive onChange={(e) => handleListSelection(e.target.value)}>
          {symbolsList.map((listObject, index) => {
            const key = Object.keys(listObject)[0];
            return (
              <S.Option key={key} value={`List ${index + 1}`}>
                {`List ${index + 1}`}
              </S.Option>
            );
          })}
        </S.SelectActive>
      </S.DropdownContainer>
      <S.CustomTable>
        <S.TableHead>
          <tr>
            <S.TableHeader>Symbol</S.TableHeader>
            <S.TableHeader>Last Price</S.TableHeader>
            <S.TableHeader>Bid Price</S.TableHeader>
            <S.TableHeader>Ask Price</S.TableHeader>
            <S.TableHeader>Price Change (%)</S.TableHeader>
          </tr>
        </S.TableHead>
        <tbody>
          {symbolData.map((symbol) => (
            <S.TableRow key={symbol.symbol}>
              <S.TableCell>{symbol.symbol}</S.TableCell>
              <S.TableCell>{symbol.lastPrice}</S.TableCell>
              <S.TableCell>{symbol.bestBidPrice}</S.TableCell>
              <S.TableCell>{symbol.bestAskPrice}</S.TableCell>
              <S.TableCell>{symbol.priceChangePercent}</S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.CustomTable>
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useSymbolContext } from '../../context/context';
import { ISymbol } from '../../models/symbol';
import * as S from './styles';

const Dashboard: React.FC = () => {
  const { symbolContext, symbolsList, setSymbolsList } = useSymbolContext();
  const [symbolData, setSymbolData] = useState<ISymbol[]>([]);
  const [listNames, setListNames] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectChange = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const BASE_URL = `wss://stream.binance.com:9443/stream?streams=`;

  const url = BASE_URL + symbolContext.map((symbol) =>
    `${symbol.symbol.toLowerCase()}@ticker`).join('/')

  useEffect(() => {
    const socket = new WebSocket(url);
    socket.onmessage = (event) => {
      const { data } = JSON.parse(event.data);
      const newSymbolData = {
        symbol: data.s,
        lastPrice: data.c,
        bestBidPrice: data.b,
        bestAskPrice: data.a,
        priceChangePercent: data.P
      };

      setSymbolData((prevData) => {
        const updatedData = [...prevData];
        const existingSymbolIndex = updatedData.findIndex((item) => item.symbol === data.s);
        if (existingSymbolIndex !== -1) {
          updatedData[existingSymbolIndex] = newSymbolData;
        } else {
          updatedData.push(newSymbolData);
        }
        return updatedData;
      });
    }

    const names = symbolContext.map((_, index) => `List ${index + 1}`);
    setListNames(names);
  }, [url, symbolContext]);

  const handleListSelection = (listName: string) => {
    const selectedListIndex = listNames.indexOf(listName);
    const selectedList = symbolsList[selectedListIndex];
    setSymbolsList(selectedList);
  };

  return (
    <div>
      <S.DropdownContainer>
        {isDropdownOpen ? (
          <S.SelectActive onChange={(e) => handleListSelection(e.target.value)}>
            {symbolsList.map((index) => (
              <S.Option key={index} value={`List ${index + 1}`}>{`List ${index + 1}`}</S.Option>
            ))}
          </S.SelectActive>
        ) : (
          <S.Select onChange={(e) => handleListSelection(e.target.value)}>
            {symbolsList.map((list, index) => (
              <S.Option key={index} value={`List ${index + 1}`}>{`List ${index + 1}`}</S.Option>
            ))}
          </S.Select>
        )}
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
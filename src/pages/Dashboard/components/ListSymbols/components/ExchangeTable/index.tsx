import { useState, useCallback, useEffect } from "react";
import * as S from "../../styles";
import useWebSocket from "react-use-websocket";
import { useExchangeInfo } from "../../../../context/useExchangeInfo";

type TSymbolInfo = {
  A: string;
  B: string;
  C: number;
  E: number;
  F: number;
  L: number;
  O: number;
  P: string;
  Q: string;
  a: string;
  b: string;
  c: string;
  e: string;
  h: string;
  l: string;
  n: number;
  o: string;
  p: string;
  q: string;
  s: string;
  v: string;
  w: string;
  x: string;
};

type TWebSocketMessage = {
  stream: string;
  data: TSymbolInfo;
};

type TExchangesInfo = {
  [key: string]: TSymbolInfo;
};

const ExchangeTable = () => {
  const [exchangesInfo, setExchangesInfo] = useState<TExchangesInfo>({});

  const { exchanges } = useExchangeInfo();

  const symbolList =
    exchanges.currentList &&
    Object.values((exchanges.lists as TExchangesInfo)[exchanges.currentList])
      ?.map((symbol: string | number) =>
        typeof symbol === "string" ? symbol.toLowerCase() : symbol
      )
      .join("@ticker/");

  const wsUrl = `wss://stream.binance.com:9443/stream?streams=${symbolList}`;

  const { lastJsonMessage } = useWebSocket<TWebSocketMessage>(wsUrl, {
    onOpen: () => console.log(`Connected to App WS`),
    onError: (event) => {
      console.error(event);
    },
    onMessage: () => {
      if (lastJsonMessage) {
        setExchangesInfo((prev) => ({
          ...prev,
          [lastJsonMessage.stream]: { ...lastJsonMessage.data },
        }));
      }
    },
    shouldReconnect: () => true,
    reconnectInterval: 10,
  });

  const formatNumberToFixed = useCallback(
    (value: string, decimalPlaces: number = 4) => {
      return parseFloat(value).toFixed(decimalPlaces);
    },
    []
  );

  const formatPercentage = useCallback((value: string) => {
    return (parseFloat(value) * 10000).toFixed(2);
  }, []);

  useEffect(() => {
    setExchangesInfo({});

    return () => {
      setExchangesInfo({});
    };
  }, [exchanges.currentList]);

  return (
    <S.Table>
      <S.TableHead>
        <tr>
          <S.TableHeaderCell>Symbol</S.TableHeaderCell>
          <S.TableHeaderCell>Last Price</S.TableHeaderCell>
          <S.TableHeaderCell>Bid Price</S.TableHeaderCell>
          <S.TableHeaderCell>Ask Price</S.TableHeaderCell>
          <S.TableHeaderCell>Price Change (%)</S.TableHeaderCell>
        </tr>
      </S.TableHead>
      <tbody>
        {Object.entries(exchangesInfo)?.map(([key, value]) => (
          <S.TableRow key={key}>
            <td>{value.s}</td>
            <S.TableCell>{formatNumberToFixed(value.c)}</S.TableCell>
            <S.TableCell>{formatNumberToFixed(value.b)}</S.TableCell>
            <S.TableCell>{formatNumberToFixed(value.a)}</S.TableCell>
            {/* TODO: Resolve warning */}
            <S.TableCell ispositive={formatPercentage(value.p)}>
              {formatPercentage(value.p)}
            </S.TableCell>
          </S.TableRow>
        ))}
      </tbody>
    </S.Table>
  );
};

export default ExchangeTable;
